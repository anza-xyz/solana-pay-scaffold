import { FC } from "react";

export const Heading: FC = ({ children }) => {
  return (
    <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
      {children}
    </h1>
  )
}