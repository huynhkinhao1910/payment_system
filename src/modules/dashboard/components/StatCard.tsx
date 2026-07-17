import iconStat from '@/assets/icon-stat.svg'
import wavePurple from '@/assets/wave-purple.svg'
import waveGreen from '@/assets/wave-green.svg'
import waveBlue from '@/assets/wave-blue.svg'
import waveOrange from '@/assets/wave-orange.svg'

const WAVES = { purple: wavePurple, green: waveGreen, blue: waveBlue, orange: waveOrange }
const FG = {
  purple: 'text-stat-purple',
  green: 'text-stat-green',
  blue: 'text-stat-blue',
  orange: 'text-stat-orange',
}
const BG = {
  purple: 'bg-stat-purple',
  green: 'bg-stat-green',
  blue: 'bg-stat-blue',
  orange: 'bg-stat-orange-icon',
}

export type Tone = keyof typeof WAVES

export default function StatCard({ label, value, tone }: { label: string; value: string; tone: Tone }) {
  return (
    <div className="relative h-[130px] flex-1 overflow-clip rounded-[4px] bg-white shadow-card">
      <p className={`absolute top-[20px] left-[23px] text-[13px] font-medium ${FG[tone]}`}>{label}</p>
      <div className="absolute top-[55px] left-[23px] flex items-center gap-[20px]">
        <span className={`flex size-[33px] items-center justify-center rounded-full ${BG[tone]}`}>
          <img src={iconStat} alt="" className="size-[14px]" />
        </span>
        <span className="text-[24px] font-medium text-black">{value}</span>
      </div>
      <img src={WAVES[tone]} alt="" className="absolute top-[95px] left-[-85px] h-[194px] w-[457px] max-w-none" />
    </div>
  )
}
