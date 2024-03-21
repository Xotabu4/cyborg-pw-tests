import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const src = `./../../data/reports/${id}/index.html`;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reports', href: '' },
          {
            label: 'See Report',
            href: `/report/${id}`,
            active: true,
          },
        ]}
      />

      <iframe
        src={src}
        width={1920}
        height={1080}
        // frameborder="0"
        // allowfullscreen
      />
      {/* <Form invoice={invoice} customers={customers} /> */}
    </main>
  );
}
