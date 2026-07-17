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
    // Sizes key off the card's own width, so a card is compact whether it's narrow
    // because the viewport is small or because it's one of four columns.
    <div className="@container relative min-h-[130px] overflow-clip rounded-[4px] bg-white shadow-card">
      {/* Decorative, so it stays absolute — anchored to the bottom edge so the visible
          band is the same 35px whatever height a wrapped label gives the card. */}
      <img
        src={WAVES[tone]}
        alt=""
        className="absolute -bottom-[159px] left-[-85px] h-[194px] w-[457px] max-w-none"
      />
      <div className="relative flex flex-col px-[14px] py-[20px] @min-[240px]:px-[23px]">
        <p className={`text-[12px] font-medium @min-[240px]:text-[13px] ${FG[tone]}`}>{label}</p>
        <div className="mt-[12px] flex items-center gap-[10px] @min-[240px]:gap-[20px]">
          {/* Decoration yields to the number once the card gets tight. */}
          <span
            className={`hidden size-[33px] shrink-0 items-center justify-center rounded-full @min-[200px]:flex ${BG[tone]}`}
          >
            <img src={iconStat} alt="" className="size-[14px]" />
          </span>
          <span className="min-w-0 truncate text-[18px] font-medium text-black @min-[240px]:text-[24px]">{value}</span>
        </div>
      </div>
    </div>
  )
}
