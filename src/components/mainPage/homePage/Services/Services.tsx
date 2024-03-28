import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // A default icon
import { library, IconName } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Image from "next/image";
import { TG_ServiceType } from "@/lib/shared/types";

library.add(Icons.fas);

type Props = {
  serviceTypes: TG_ServiceType[];
};

const Services = ({ serviceTypes }: Props) => {
  return (
    <section className="w-full bg-slate-50">
      <div className="flex w-full flex-row gap-3 pb-6">
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Služby
        </h1>
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
      </div>
      <div className="m-auto flex w-[93%] flex-col flex-wrap xl:w-[61.8%] xl:flex-row">
        {serviceTypes.length > 1 &&
          serviceTypes.map((serviceType, index) => (
            <ServiceCard key={index} serviceType={serviceType} />
          ))}
      </div>
    </section>
  );
};

type ServiceCardProps = {
  serviceType: TG_ServiceType;
};

const ServiceCard = ({ serviceType }: ServiceCardProps) => {
  const renderIcon = (iconName: string) => {
    const iconKey = iconName.replace("Fa", "").toLowerCase();

    const faIcon = (Icons as any)[
      `fa${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`
    ];

    return faIcon ? (
      <FontAwesomeIcon icon={faIcon as any} />
    ) : (
      <FontAwesomeIcon icon={faHeart} />
    );
  };

  return (
    <CardContainer
      className="group m-2 flex h-[500px] min-h-[500px] w-full flex-col justify-start rounded-lg border-2 border-slate-200 bg-white"
      containerClassName="p-0 xl:w-1/2"
    >
      <CardBody className="h-full min-h-[500px] w-full">
        <div className="h-1/2 w-full">
          <div className="absolute left-4 top-4 z-10 h-10 w-10 text-5xl text-white">
            {renderIcon(serviceType.iconName)}
          </div>
          <Image
            src={serviceType.imageUrl || "/login.png"}
            alt={serviceType.name}
            quality={100}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg object-cover"
          />
          <div className="absolute inset-0 rounded-t-lg bg-black opacity-60" />
          <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white drop-shadow-md">
            {serviceType.name}
          </h3>
        </div>
        <div className="flex h-1/2 flex-grow flex-col justify-between p-5">
          <p className="md:mb-4 text-left text-gray-600">
            {serviceType.description.slice(0, 180) + "..."}
          </p>
          <ul className="self-stretch">
            {serviceType.stdcs.map((item, index) => (
              <li key={index} className="my-1 flex justify-center gap-1">
                <span>{item.durationMinutes} minút – </span>
                <span>{item.cost}€</span>
              </li>
            ))}
          </ul>
          <CardItem
            translateZ="40"
            translateY="-7"
            className="flex w-full justify-center"
          >
            <Link
              className="flex h-10 w-5/6 flex-row items-center justify-center rounded-sm bg-primary px-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-primary/85 group-hover:h-11 group-hover:text-lg group-hover:shadow-xl"
              href={"/sluzby/" + serviceType.slug}
            >
              Viac informácií
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Services;
