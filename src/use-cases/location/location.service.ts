import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { LocationPaginateDTO } from './dto/location-paginate.dto';
import { Prisma } from '@prisma/client';
import { LocationCreateDTO } from './dto/location-create.dto';
import { LocationDetailDTO } from './dto/location-detail.dto';
import { TrackDTO } from './dto/track.dto';
import { LocationChangeLocationDTO } from './dto/location-change-sector.dto';
import { CalcHandlerService } from 'src/shared/handlers/calc.handler';

@Injectable()
export class LocationService {

    constructor(
        public prismaService: PrismaService,
        public calcHandlerService: CalcHandlerService
    ) { }

    async paginate(params: LocationPaginateDTO) {
        const order: Prisma.SortOrder =
            (params.order as unknown as Prisma.SortOrder) || 'asc';
        const page = params.page ? +params.page : 1;
        const perPage = params.pageSize ? +params.pageSize : 10;

        const total = await this.prismaService.location.count({
            where: {
                name: {
                    contains: params.search,
                    mode: 'insensitive',
                },
            },
        });

        const totalPages = Math.ceil(total / perPage);
        const offset = perPage * (page - 1);

        const locations = await this.prismaService.location.findMany({
            select: {
                id: true,
                name: true,
                isActive: true,
                description: true,
                sector_id: true,
                Sector: true,
                created_at: true,
                updated_at: true,
            },
            where: {
                name: {
                    contains: params.search,
                    mode: 'insensitive',
                },
            },
            take: perPage,
            skip: offset,
            orderBy: {
                name: order,
            },
        });


        const response = {
            data: locations,
            total,
            page,
            totalPages,
        };

        return response;
    }

    async create(data: LocationCreateDTO, user_id: string) {

        try {
            const exist = await this.prismaService.location.findFirst({
                where: {
                    name: data.name
                }
            })

            if (exist) throw new ConflictException('Identificação já está em uso')

            const location = await this.prismaService.location.create({
                data: {
                    name: data.name,
                    isActive: data.isActive,
                    sector_id: data.sector_id,
                    description: data.description
                }
            })

            return {
                message: 'Localização criado com sucesso',
            };
        }
        catch (error) {
            throw new ConflictException(error.message)
        }
    }

    async detail(data: LocationDetailDTO) {
        const customer = await this.prismaService.location.findUnique({
            where: {
                id: data.id,
            },
            select: {
                id: true,
                name: true,
                isActive: true,
                description: true,
                sector_id: true,
                Sector: true,
                created_at: true,
                updated_at: true,

                Volume: {
                    select: {
                        id: true,
                        created_at: true,
                        entry_id: true,
                        Entry: {
                            select: {
                                batch: true,
                                field: true,
                                Register: true,
                                observation: true,
                                Producer: {
                                    select: {
                                        Person: true
                                    }
                                },
                                User: {
                                    select: {
                                        Person: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        Product: true,
                        Material: true,
                        product_name: true,
                        amount: true,
                        size: true,
                        type: true,
                        volume: true,
                        weight: true,
                    },
                    where: {
                        volume_group_id: null,
                        deleted_at: null
                    }
                },
            },
        });

        const groups = await this.prismaService.volumeGroup.findMany({
            where: {
                location_id: data.id,
                Volume: {
                    some: {
                        deleted_at: null,
                        exited: false
                    }
                }
            },
            select: {
                id: true,
                Volume: {
                    select: {
                        id: true,
                        created_at: true,
                        entry_id: true,
                        Entry: {
                            select: {
                                batch: true,
                                field: true,
                                Register: true,
                                observation: true,
                                Producer: {
                                    select: {
                                        Person: true
                                    }
                                },
                                User: {
                                    select: {
                                        Person: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        Product: true,
                        Material: true,
                        product_name: true,
                        amount: true,
                        size: true,
                        type: true,
                        volume: true,
                        weight: true,
                        volume_group_id: true
                    },
                    where: {
                        deleted_at: null,
                        exited: false
                    },
                },
            }
        })

        const allVolumes = [
            ...customer.Volume,
            ...groups.flatMap(g => g.Volume)
        ];

        const totalWeight = this.calcHandlerService.totalWeight(allVolumes);

        const groupsWithTotalsAndMaterials = groups.map(group => {
            const totalWeight = group.Volume.reduce(
                (sum, v) => sum + (Number(v.weight) || 0),
                0
            );

            const materialsMap = new Map();

            group.Volume.forEach(v => {
                if (v.Material) {
                    materialsMap.set(v.Material.id, v.Material);
                }
            });

            const materials = Array.from(materialsMap.values());

            return {
                ...group,
                totalWeight,
                materials,
            };
        });


        if (customer) {
            return {
                ...customer,
                totalVolumes: allVolumes.length,
                totalVolumeWeight: totalWeight,
                groups: groupsWithTotalsAndMaterials
            }
        } else {
            throw new ConflictException('Localização não encontrada')
        }
    }

    async update(data: LocationCreateDTO, user_id: string) {

        const exist = await this.prismaService.location.findFirst({
            where: {
                id: {
                    not: data.id,
                },
                name: data.name
            }
        })

        if (exist) throw new ConflictException('Identificação já está em uso')

        const update = await this.prismaService.location.findUnique({
            where: {
                id: data.id,
            },
        });

        const before = await this.prismaService.location.findUnique({
            where: {
                id: data.id,
            },
        });

        const location = await this.prismaService.location.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                isActive: data.isActive,
                sector_id: data.sector_id,
                description: data.description
            }
        });

        return {
            message: 'Localização atualizada com sucesso',
            type: 'success'
        };
    }

    async getSectors() {

        const sectors = await this.prismaService.sector.findMany({
            where: {
                isActive: true
            }
        });

        return {
            data: sectors
        }
    }

    async combolist() {
        const locations = await this.prismaService.location.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        locations.sort((a, b) => {
            const numA = parseInt(a.name.replace(/\D/g, ''), 10);
            const numB = parseInt(b.name.replace(/\D/g, ''), 10);
            return numA - numB;
        });

        return locations
    }

    async getTrack(params: TrackDTO) {

        const sector_id = params.sector_id;
        const filter = params.filter;

        const filterConditions = {
            isActive: true
        };

        if (sector_id) {
            filterConditions['sector_id'] = String(sector_id);
        }

        if (filter) {
            filterConditions['name'] = {
                contains: filter,
                mode: 'insensitive'
            };
        }

        const locations = await this.prismaService.location.findMany({
            where: filterConditions,
            select: {
                id: true,
                name: true,
                isActive: true,
                description: true,
                sector_id: true,
                Sector: true,
                Volume: {
                    select: {
                        id: true,
                        created_at: true,
                        entry_id: true,
                        Entry: {
                            select: {
                                Register: true,
                                Producer: {
                                    select: {
                                        Person: true
                                    }
                                }
                            }
                        },
                        Product: true,
                        Material: true,
                        product_name: true,
                        amount: true,
                        weight: true,
                        size: true,
                        type: true,
                        volume: true,
                    },
                    where: {
                        deleted_at: null,
                        volume_group_id: null
                    }
                },
                VolumeGroup: {
                    where: {
                        Volume: {
                            some: {
                                deleted_at: null,
                                exited: false
                            }
                        }
                    },
                    select: {
                        Volume: {
                            select: {
                                id: true,
                                created_at: true,
                                entry_id: true,
                                Entry: {
                                    select: {
                                        batch: true,
                                        field: true,
                                        Register: true,
                                        observation: true,
                                        Producer: {
                                            select: {
                                                Person: true
                                            }
                                        },
                                        User: {
                                            select: {
                                                Person: {
                                                    select: {
                                                        name: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                Product: true,
                                Material: true,
                                product_name: true,
                                amount: true,
                                size: true,
                                type: true,
                                volume: true,
                                weight: true,
                                volume_group_id: true
                            },
                            where: {
                                deleted_at: null,
                                exited: false
                            },
                        },
                    },
                }
            },
            orderBy: {
                name: 'asc'
            }
        })

        const locationsWithTotalWeight = locations.map(location => {
            const totalVolumeWeight = this.calcHandlerService.totalWeight(location.Volume);

            const volumeGroups = location.VolumeGroup?.map(group => {

                const groupWeight = this.calcHandlerService.totalWeight(group.Volume);

                const materialsMap = new Map();
                group.Volume.forEach(v => {
                    if (v.Material) {
                        materialsMap.set(v.Material.id, v.Material);
                    }
                });
                const materials = Array.from(materialsMap.values());

                return {
                    ...group,
                    groupWeight,
                    materials,
                };
            }) || [];

            const totalGroupWeight = volumeGroups.reduce((sum, g) => sum + g.groupWeight, 0);

            const totalVolumes =
                (location.Volume?.length ?? 0) +
                (location.VolumeGroup?.reduce((sum, g) => sum + g.Volume.length, 0) ?? 0);

            return {
                ...location,
                VolumeGroup: volumeGroups,
                totalVolumeWeight,
                totalGroupWeight,
                totalWeight: totalVolumeWeight + totalGroupWeight,
                totalVolumes 
            };
        });




        locationsWithTotalWeight.sort((a, b) => {
            const numA = parseInt(a.name.replace(/\D/g, ''), 10);
            const numB = parseInt(b.name.replace(/\D/g, ''), 10);
            return numA - numB;
        });

        return locationsWithTotalWeight;
    }

    async changeSector(data: LocationChangeLocationDTO, user_id: string) {

        await this.prismaService.location.update({
            where: {
                id: data.location_id
            },
            data: {
                sector_id: data.new_sector_id
            }
        })

        return {
            message: 'Localização do palete atualizado com sucesso.'
        }
    }
}
