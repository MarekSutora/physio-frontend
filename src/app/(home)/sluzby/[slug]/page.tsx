import {
  getServiceTypeBySlugAction,
  getServiceTypesAction,
} from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React from "react";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const serviceTypes = await getServiceTypesAction();

    return serviceTypes.map((st) => ({
      params: {
        slug: st.slug,
      },
    }));
  } catch (error) {
    console.log(error);
    return [
      {
        params: {
          slug: "",
        },
      },
    ];
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  let serviceType: TG_ServiceType;
  try {
    serviceType = await getServiceTypeBySlugAction(params.slug);
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }

  return (
    <article>
      <Image
        src={serviceType.imageUrl || "/login.png"}
        alt={`${serviceType.name} image`}
        width={700}
        height={475}
      />
      <div style={{ position: "relative" }}>
        <h1
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            color: "white",
            textShadow: "1px 1px 2px black",
          }}
        >
          {serviceType.name}
        </h1>
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          {/* Render icon here */}
        </div>
      </div>
      <div style={{ padding: "15px" }}>
        <p>{serviceType.description}</p>
        <dl>
          {serviceType.stdcs.map((item, index) => (
            <div key={index}>
              <dt className="font-bold">{item.durationMinutes} minutes:</dt>
              <dd>{item.cost}€</dd>
            </div>
          ))}
        </dl>
        {/* Include any other information you want about the service type */}
      </div>
    </article>
  );
};

export default Page;