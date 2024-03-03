import { TClient } from '@/lib/shared/types';
import React from 'react'

type Props = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
  };

const Page = async (props: Props) => {
    let client: TClient | undefined = undefined;
    
    const clientId = props.searchParams.clientId;

    let clientIdNumber = -1;
    if (clientId) {
        clientIdNumber = parseInt(clientId as string);
    }
    

  return (
    <div>Page</div>
  )
}

export default Page