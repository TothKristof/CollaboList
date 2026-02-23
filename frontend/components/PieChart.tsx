import { Cell } from 'recharts';
import { categories } from '@/data/categories';
import { PieChart, ResponsiveContainer, Pie, Tooltip } from 'recharts';
import { lists } from '@/data/lists';
import { CategoryKey } from '@/data/categories';
import styled from "@emotion/styled";
import { useAuth } from '@/context/authContext';

interface PieChartProps {
  lists: {
    name: string;
    category: CategoryKey;
  }[];
}

type ChartEntry = {
    name: string;
    value: number;
    category: CategoryKey;
};

const CustomHeading = styled.h3({
    width: '200px',
    margin: 'auto',
    textAlign: 'center'
})

function PieChartComponent({ lists }: PieChartProps) {

  const chartData = Object.values(
    lists.reduce<Record<string, ChartEntry>>((acc, list) => {
      if (!acc[list.name]) {
        acc[list.name] = {
          name: list.name,
          value: 0,
          category: list.category,
        };
      }

      acc[list.name].value += list.category.length;
      return acc;
    }, {})
  );

  return (
    <>
      <CustomHeading>List item counts</CustomHeading>

      {lists.length ? (
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
                  fill={categories[entry.category].color}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div>This user doesn't own any list</div>
      )}
    </>
  );
}

export default PieChartComponent