'use client'
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Template } from '@/components/template';
import { usePathname } from 'next/navigation';

interface pageProps{
  params: {name: string, content: string}
}

const Page: FC<pageProps> = ({params}) => {
  const [data, setData] = useState<{ name: string; content: string } | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const apiUrl = `https://k63mgfkn-3000.euw.devtunnels.ms${pathname}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(JSON.parse(response.data.template));
      } catch (error: any) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('Current pathname:', pathname);

  return (
    <>
      {console.log(data)}
      {loading ? (
        <div>Loading</div>
      ) : (
        data ? (
          <Template name={data.name} content={data.content} />
        ) : (
          <div>Data is not in the expected format</div>
        )
      )}
    </>
  );
};

export default Page;