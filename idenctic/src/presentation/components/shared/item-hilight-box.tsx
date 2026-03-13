import Image from "next/image";

type ItemHilightBoxProps = {
  title: string;
  description: string;
  icon: string;
  iconSize?: number;
};

export default function ItemHilightBox({
  title,
  description,
  icon,
  iconSize = 20,
}: ItemHilightBoxProps) {
  return (
    <div className="bg-primary-800/50 backdrop-blur-sm p-6 rounded-lg border border-primary-700">
      <div className="flex items-start mb-2">
        <Image
          src={icon}
          alt="icon"
          width={0}
          height={0}
          className="xl:w-6 xl:h-6 w-5 h-5"
        />
        <h3 className="text-sm md:text-base xl:text-lg font-bold text-white ml-2">
          {title}
        </h3>
      </div>
      <p className="text-xs md:text-sm xl:text-base text-primary-300">
        {description}
      </p>
    </div>
  );
}
