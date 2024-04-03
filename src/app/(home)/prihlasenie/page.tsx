import LoginForm from "@/components/auth/LoginForm";
import loginPic from "@/root/public/login.png";
import Image from "next/image";

export const metadata = {
  title: "Prihlásenie",
  description: "Prihlásenie do aplikácie",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  return (
    <section className="min-h-[700px] w-full bg-white flex items-center justify-center">
      <div className="flex h-full items-center justify-center gap-7 md:flex-row">
        <Image
          src={loginPic}
          alt="LoginImage"
          width={350}
          height={350}
          className="hidden h-[350px] w-[350px] rounded-2xl shadow-lg md:block"
        />
        <LoginForm searchParams={props.searchParams} />
      </div>
    </section>
  );
};

export default Page;
