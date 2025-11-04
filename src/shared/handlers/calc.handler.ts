import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcHandlerService {

    totalWeight(volumes: any): number {
        try {
            if (!volumes || volumes.length === 0) {
                return 0;
            }

            return volumes.reduce((totalAcumulado, volume) => {
                const weight = Number(volume.weight) || 0;
                return totalAcumulado + weight;
            }, 0);
        }
        catch (err) {
            console.error("Erro ao calcular o peso total:", err);
            return 0;
        }
    }

    calcUnitsByWeight(totalWeightKg: number, unitWeightKg: number): number {
        if (!totalWeightKg || !unitWeightKg || unitWeightKg === 0) return 0;

        return Math.floor(totalWeightKg / unitWeightKg);
    }
}
