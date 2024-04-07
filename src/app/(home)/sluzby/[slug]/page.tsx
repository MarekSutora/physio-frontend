import {
  getServiceTypeBySlugAction,
  getServiceTypesAction,
} from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let serviceType: TG_ServiceType;

  try {
    serviceType = await getServiceTypeBySlugAction(params.slug);
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching service type");
  }

  return {
    title: serviceType.name,
    description: serviceType.description,
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  let serviceType: TG_ServiceType;
  try {
    serviceType = await getServiceTypeBySlugAction(params.slug);
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }

  const renderIcon = (iconName: string) => {
    const iconKey = iconName.replace("Fa", "").toLowerCase();

    const faIcon = (Icons as any)[
      `fa${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`
    ];

    return faIcon ? (
      <FontAwesomeIcon aria-label="Illustration Icon" icon={faIcon as any} />
    ) : (
      <FontAwesomeIcon aria-label="Illustration Icon" icon={faHeart} />
    );
  };

  return (
    <section className="mx-auto mb-6 w-5/6 max-w-2xl overflow-hidden rounded-lg bg-white">
      {/* Image container */}
      <div className="relative">
        {/* Image */}
        <Image
          src={serviceType.imageUrl || "/default-image.png"}
          alt={`${serviceType.name} image`}
          width={700}
          height={475}
          className="w-full object-cover"
          layout="responsive"
          quality={50}
        />
        {/* Service name */}
        <div className="absolute top-2 left-2 z-10 h-12 w-12 text-gray-100">
          {renderIcon(serviceType.iconName)}
        </div>
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-primary/20" />
        <h2 className="absolute bottom-0 right-0 rounded-tl-lg bg-black bg-opacity-70 p-3 text-lg font-semibold text-white">
          {serviceType.name}
        </h2>
      </div>

      {/* Text */}
      <div className="p-4">
        <p className="text-gray-600">{serviceType.description}</p>
      </div>

      {/* Cost Info */}
      <div className="rounded-lg bg-gray-100 px-4 py-2">
        <h3 className="mb-2 text-lg font-bold">Ceny</h3>
        <ul>
          {serviceType.stdcs.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-gray-800">
                {item.durationMinutes} minút
              </span>
              <span className="font-semibold">{item.cost}€</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
