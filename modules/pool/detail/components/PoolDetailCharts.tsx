import { HStack, Select } from '@chakra-ui/react';
import Card from '~/components/card/Card';
import { PoolDetailBptPriceChart } from '~/modules/pool/detail/components/charts/PoolDetailBptPriceChart';
import { usePool } from '~/modules/pool/lib/usePool';
import { useState } from 'react';
import { PoolDetailVolumeLiquidityChart } from '~/modules/pool/detail/components/charts/PoolDetailVolumeLiquidityChart';
import { PoolDetailFeesChart } from '~/modules/pool/detail/components/charts/PoolDetailFeesChart';
import { GqlPoolSnapshotDataRange, useGetPoolSnapshotsQuery } from '~/apollo/generated/graphql-codegen-generated';

type ChartType = 'BPT_PRICE' | 'VOLUME_TVL' | 'FEES';

export function PoolDetailCharts() {
    const { pool } = usePool();
    const [chartType, setChartType] = useState<ChartType>('BPT_PRICE');
    const [range, setRange] = useState<GqlPoolSnapshotDataRange>('THIRTY_DAYS');
    const { data } = useGetPoolSnapshotsQuery({ variables: { poolId: pool.id, range } });

    return (
        <Card height="full" minHeight="540px">
            <HStack padding="4" pb="0" spacing="4">
                <Select
                    value={chartType}
                    onChange={(e) => setChartType(e.currentTarget.value as ChartType)}
                    width="180px"
                    variant="filled"
                >
                    <option value="BPT_PRICE">BPT price</option>
                    <option value="VOLUME_TVL">Volume / TVL</option>
                    <option value="FEES">Fees</option>
                </Select>
                <Select
                    value={range}
                    onChange={(e) => setRange(e.currentTarget.value as GqlPoolSnapshotDataRange)}
                    width="160px"
                    variant="filled"
                >
                    <option value="THIRTY_DAYS">last 30 days</option>
                    <option value="NINETY_DAYS">last 90 days</option>
                    <option value="ONE_HUNDRED_EIGHTY_DAYS">last 180 days</option>
                    <option value="ONE_YEAR">last 365 days</option>
                    <option value="ALL_TIME">All time</option>
                </Select>
            </HStack>
            {chartType === 'BPT_PRICE' && (
                <PoolDetailBptPriceChart
                    prices={(data?.snapshots || []).map((snapshot) => ({
                        timestamp: snapshot.timestamp,
                        price: snapshot.sharePrice,
                    }))}
                />
            )}
            {chartType === 'VOLUME_TVL' && <PoolDetailVolumeLiquidityChart data={data?.snapshots || []} />}
            {chartType === 'FEES' && <PoolDetailFeesChart data={data?.snapshots || []} />}
        </Card>
    );
}
