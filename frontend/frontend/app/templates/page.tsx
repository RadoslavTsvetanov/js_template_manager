'use client'
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Template } from '@/components/template';
import { usePathname } from 'next/navigation';

interface TemplateData {
  name: string;
  content: string;
}

interface PageProps {
  params: { name: string; content: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<TemplateData[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const apiUrl = 'https://k63mgfkn-3000.euw.devtunnels.ms/all_templates';

    const fetchData = async () => {
      try {
        const response = await axios.get<TemplateData[]>(apiUrl);
        console.log(response.data);
        setData(response.data);
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
          data.map((template, index) => (
            <Template key={index} name={template.name} content={template.content} />
          ))
        ) : (
          <div>Data is not in the expected format</div>
        )
      )}
    </>
  );
};

export default Page;
