import { useQuery } from 'react-query';
import { useProvider } from 'wagmi';
import { masterChefService } from '~/lib/services/staking/master-chef.service';
import { GqlPoolStaking } from '~/apollo/generated/graphql-codegen-generated';
import { gaugeStakingService } from '~/lib/services/staking/gauge-staking.service';

export function useStakingTotalStakedBalance(poolAddress: string, staking: GqlPoolStaking) {
    const provider = useProvider();

    return useQuery(
        ['useStakingTotalStakedBalance', poolAddress, staking.id],
        () => {
            switch (staking.type) {
                case 'MASTER_CHEF':
                case 'FRESH_BEETS':
                    return masterChefService.getMasterChefTokenBalance({
                        address: poolAddress,
                        provider,
                        decimals: 18,
                    });

                case 'GAUGE':
                    return gaugeStakingService.getGaugeTokenBalance({
                        tokenAddress: poolAddress,
                        provider,
                        decimals: 18,
                        gaugeAddress: staking.gauge?.gaugeAddress || '',
                    });
            }
        },
        { refetchInterval: 30000 },
    );
}
