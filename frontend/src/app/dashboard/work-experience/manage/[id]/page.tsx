
import ManageWorkExperience from '@/components/dashboard/work-experience/add-update';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Manage Work Experience`,
};

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  return (
    <div className="grid grid-cols-8 max-w-5xl m-auto gap-5">
      <div className="col-span-8 grid gap-5">
        <Card>
          <div className="flex items-center justify-between">
            <CardHeader className="p-0">
              <CardTitle>{+id === 0 ? 'Add Work Experience' : 'Update Work Experience'}</CardTitle>
            </CardHeader>
            <div className="flex items-center gap-2">
              <Button>
                <Link href="/dashboard/work-experience/">Back to list</Link>
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <ManageWorkExperience id={id} />
        </Card>
      </div>
    </div>
  );
}
