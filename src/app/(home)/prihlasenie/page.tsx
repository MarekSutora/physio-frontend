import LoginForm from "@/components/auth/LoginForm";
import loginPic from "@/root/public/login.png";
import Image from "next/image";

//TODO ked nejde api tak ukazuje fetch failed - treba nejaku inu message

const Page = () => {
  return (
    <section className="h-[var(--min-height-main-section)] w-full bg-white">
      <div className="flex h-full items-center justify-center gap-7 md:flex-row">
        <Image
          src={loginPic}
          alt="LoginImage"
          width={350}
          height={350}
          className="hidden h-[350px] w-[350px] rounded-2xl shadow-lg md:block"
        />
        <LoginForm />
      </div>
    </section>
  );
};

export default Page;
