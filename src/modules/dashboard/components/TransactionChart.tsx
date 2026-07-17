import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const LAST_WEEK = '#8979ff'
const THIS_WEEK = '#ff928a'
const AXIS = 'rgba(0,0,0,0.7)'

const tick = { fontSize: 12, fill: AXIS }

export default function TransactionChart({
  title,
  subtitle,
  yLabel,
  data,
}: {
  title: string
  subtitle: string
  yLabel: string
  data: { day: string; current: number; last: number }[]
}) {
  return (
    <div className="h-[428px] min-w-0 rounded-[4px] bg-white p-[16px] shadow-card">
      <p className="text-[13px] font-medium text-black">{title}</p>
      <p className="mt-[18px] text-[11px] text-neutral-500">{subtitle}</p>
      <div className="mt-[10px] h-[267px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
            <XAxis dataKey="day" tick={tick} tickLine={false} axisLine={{ stroke: '#e6e6e6' }} />
            <YAxis
              tick={tick}
              tickLine={false}
              axisLine={false}
              domain={[0, 'auto']}
              label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: AXIS } }}
            />
            <Tooltip />
            {/* Hollow markers: white fill, line-coloured stroke — as drawn in the comp. */}
            <Line
              dataKey="last"
              name="Last week"
              stroke={LAST_WEEK}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="current"
              name="This week"
              stroke={THIS_WEEK}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 5 }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, color: AXIS }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-[12px] text-center text-[12px]" style={{ color: AXIS }}>
        Days of week
      </p>
    </div>
  )
}
