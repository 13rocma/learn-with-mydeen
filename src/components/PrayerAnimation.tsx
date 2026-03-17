import { type PrayerPosition } from "@/data/prayers";

import handsRaised from "@/assets/prayer-hands-raised.jpg";
import standing from "@/assets/prayer-standing.jpg";
import bowing from "@/assets/prayer-bowing.jpg";
import prostrating from "@/assets/prayer-prostrating.jpg";
import sitting from "@/assets/prayer-sitting.jpg";
import salam from "@/assets/prayer-salam.jpg";

const positionImages: Record<PrayerPosition, string> = {
  "hands-raised": handsRaised,
  "hands-chest": standing,
  standing: standing,
  "standing-up": standing,
  bowing: bowing,
  prostrating: prostrating,
  sitting: sitting,
  "sitting-tashahhud": sitting,
  salam: salam,
};

interface Props {
  position: PrayerPosition;
  isActive: boolean;
}

const PrayerAnimation = ({ position, isActive }: Props) => {
  const src = positionImages[position];

  return (
    <div className="flex items-center justify-center py-6">
      <div
        className={`transition-opacity duration-700 rounded-xl border-2 border-primary overflow-hidden ${isActive ? "opacity-100" : "opacity-60"}`}
        style={{ width: 220, height: 280 }}
      >
        <img
          src={src}
          alt={position}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PrayerAnimation;
