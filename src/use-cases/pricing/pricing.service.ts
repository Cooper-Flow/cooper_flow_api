import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { BooleanHandlerService } from 'src/shared/handlers/boolean.handler';
import { PricingVolumesDTO } from './dto/pricing-volumes.dto';
import { PricingCreateDTO } from './dto/pricing-create.dto';
import { CurrencyEnum } from 'src/shared/constants/currency.enum';
import { PricingStatus } from 'src/shared/constants/pricing.enum';
import { RegisterType } from 'src/shared/constants/register.enum';
import { PricingPaginateDTO } from './dto/pricing-paginate.dto';
import { Prisma } from '@prisma/client';
import { PricingDetailDTO } from './dto/pricing-detail.dto';
import { PricingObservationDTO } from './dto/pricing-observation.dto';

@Injectable()
export class PricingService {


    constructor(
        public prismaService: PrismaService,
        public booleanHandlerService: BooleanHandlerService
    ) { }

    async getVolumes(params: PricingVolumesDTO) {

        const producer_id = params.producer_id ?? null;
        const filter = params.filter ?? RegisterType.entry;
        const batch = params.batch ?? null;

        switch (filter) {
            case RegisterType.entry: {
                const enters = await this.prismaService.entry.findMany({
                    where: {
                        ...(producer_id && { producer_id: producer_id }),
                        ...(batch && { batch: { contains: batch, mode: 'insensitive' } })
                    },
                    include: {
                        VolumeLog: {
                            include: {
                                User: {
                                    select: {
                                        Person: true
                                    }
                                }
                            }
                        },
                        VolumeEnter: {
                            include: {
                                Material: true,
                                Location: true,
                                Product: true,
                                Entry: {
                                    include: {
                                        Producer: {
                                            include: {
                                                Person: true
                                            }
                                        },
                                        User: true
                                    }
                                }
                            }
                        },
                        Volume: {
                            where: {
                                deleted_at: null
                            },
                            include: {
                                Material: true,
                                Location: true,
                                Product: true,
                                Exit: true,
                                Entry: {
                                    include: {
                                        Producer: {
                                            include: {
                                                Person: true
                                            }
                                        },
                                        User: true
                                    }
                                },
                                PricingItem: {
                                    include: {
                                        Pricing: true
                                    }
                                }
                            },
                        }
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                })

                const response = {
                    enters: enters
                }

                return response;
            }
            case RegisterType.exit: {

                const exits = await this.prismaService.exit.findMany({
                    where: {
                        Volume: {
                            some: {
                                Entry: {
                                    ...(producer_id && { producer_id: producer_id }),
                                }
                            }
                        }
                    },
                    include: {
                        Person: true,
                        Volume: {
                            where: {
                                deleted_at: null
                            },
                            include: {
                                Material: true,
                                Location: true,
                                Product: true,
                                Exit: true,
                                Entry: {
                                    include: {
                                        Producer: {
                                            include: {
                                                Person: true
                                            }
                                        },
                                        User: true
                                    }
                                },
                                PricingItem: {
                                    include: {
                                        Pricing: true
                                    }
                                }
                            },
                        },
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                })

                const response = {
                    exits: exits
                }

                return response;
            }
        }

        const exits = await this.prismaService.exit.findMany({
            where: {

            }
        })

        const volumes = await this.prismaService.volume.findMany({
            where: {

            }
        })
    }

    async create(data: PricingCreateDTO, user_id: string) {

        try {
            const volumes = data.volumes;

            if (volumes.length === 0) {
                throw new ConflictException('Não é possível criar precificação sem volumes')
            }

            const newPricing = await this.prismaService.pricing.create({
                data: {
                    creator_id: user_id,
                    status: PricingStatus.ongoing
                }
            })

            if (newPricing) {
                await Promise.all(
                    volumes.map(async  v => {
                        await this.prismaService.pricingItem.create({
                            data: {
                                price: 0,
                                currency: CurrencyEnum.Real,
                                volume_id: v,
                                pricing_id: newPricing.id
                            }
                        })
                    })
                )
            }

            return {
                message: 'Precificação criada com sucesso',
                pricing_id: newPricing.id
            }

        }
        catch (err) {
            throw new Error('Erro ao criar precificação')
        }
    }

    async paginate(params: PricingPaginateDTO) {

        const order: Prisma.SortOrder =
            (params.order as unknown as Prisma.SortOrder) || 'desc';
        const page = params.page ? +params.page : 1;
        const perPage = params.pageSize ? +params.pageSize : 10;

        const total = await this.prismaService.pricing.count();

        const totalPages = Math.ceil(total / perPage);
        const offset = perPage * (page - 1);

        const producer_id = params.producer_id ?? null;

        const prices = await this.prismaService.pricing.findMany({
            where: {
                PricingItem: {
                    some: {
                        Volume: {
                            Entry: {
                                ...(producer_id && { producer_id: producer_id }),
                            }
                        }
                    }
                }
            },
            include: {
                User: {
                    select: {
                        Person: true
                    }
                },
                PricingItem: {
                    include: {
                        Volume: {
                            include: {
                                Entry: {
                                    include: {
                                        Producer: {
                                            include: {
                                                Person: true
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            },
            take: perPage,
            skip: offset,
            orderBy: {
                created_at: order,
            },
        })

        const response = {
            data: prices,
            total,
            page,
            totalPages,
        };

        return response
    }

    async detail(data: PricingDetailDTO, user_id: string) {

        const id = Number(data.id)

        const pricing = await this.prismaService.pricing.findUnique({
            where: {
                id: id
            },
            include: {
                User: {
                    select: {
                        Person: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                PricingItem: {
                    include: {
                        Volume: {
                            include: {
                                Entry: {
                                    include: {
                                        Producer: {
                                            include: {
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
                                Material: true
                            }
                        }
                    }
                },
                PricingAdditional: true,
                PricingObservation: {
                    include: {
                        User: {
                            select: {
                                Person: true
                            }
                        }
                    }
                }
            },
        });

        let canEdit = false;

        if (user_id === pricing.creator_id) {
            canEdit = true
        }

        if (pricing.status === PricingStatus.closed) {
            canEdit = false
        }

        const response = {
            ...pricing,
            canEdit: canEdit
        }

        return response
    }

    async closePricing(data: any, user_id: string) {

        try {

            const price_id = data.pricingData.id;
            const volumes = data.pricingData.PricingItem;
            const additionals = data.additionalList;

            const currentPricing = await this.prismaService.pricing.findUnique({
                where: {
                    id: price_id
                }
            });

            if (currentPricing.status === PricingStatus.closed) {
                throw new Error('Precificação já está concluída')
            }

            await Promise.all(
                volumes.map(async (v: any) => {
                    await this.prismaService.pricingItem.update({
                        where: {
                            id: v.id
                        },
                        data: {
                            price: Number(v.price)
                        }
                    })
                })
            )

            await Promise.all(
                additionals.map(async (a: any) => {
                    await this.prismaService.pricingAdditional.create({
                        data: {
                            pricing_id: price_id,
                            type: a.type ?? '',
                            description: a.description ?? '',
                            price: a.price,
                            currency: a.currency
                        }
                    })
                })
            )

            const updatePricing = await this.prismaService.pricing.update({
                where: {
                    id: price_id
                },
                data: {
                    status: PricingStatus.closed
                }
            })

            return {
                message: 'Precificação finalizada com sucesso'
            }

        }
        catch (err) {
            throw new Error(err)
        }
    }

    async sendObservation(data: PricingObservationDTO, user_id: string) {

        try {
            const pricing_id = Number(data.pricing_id)
            const observation = data.observation
            const type = data.type

            switch (type) {
                case 'post': {
                    const obs = await this.prismaService.pricingObservation.create({
                        data: {
                            description: observation,
                            creator_id: user_id,
                            pricing_id: pricing_id
                        }
                    })

                    return obs
                }
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }
}
