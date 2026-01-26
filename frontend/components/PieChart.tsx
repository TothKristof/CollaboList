import { Cell } from 'recharts';
import { categories } from '@/data/categories';
import { PieChart, ResponsiveContainer, Pie, Tooltip } from 'recharts';
import { lists } from '@/data/lists';
import { CategoryKey } from '@/data/categories';
import { Heading } from '@kinsta/stratus';
import styled from "@emotion/styled";

const CustomHeading = styled.h3({
    width: '100px',
    margin: 'auto',
    textAlign: 'center'
})

function PieChartComponent() {

    const chartData = Object.entries(
        lists.reduce<Record<CategoryKey, number>>((acc, list) => {
            acc[list.category] = (acc[list.category] || 0) + list.items.length;
            return acc;
        }, {} as Record<CategoryKey, number>)
    ).map(([name, value]) => ({
        name: name as CategoryKey,
        value,
    }));
    return (
        <>
            <CustomHeading >List sizes</CustomHeading>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="52%"
                        cy="45%"
                        innerRadius={45}
                        outerRadius={80}
                    >
                        {chartData.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={categories[entry.name].color}
                            />
                        ))}
                    </Pie>
                    <Tooltip defaultIndex={3} />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default PieChartComponent