interface SectionHeaderProps {
  title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-800">
      {title}
    </h2>
  )
}