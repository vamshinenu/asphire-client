import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { headers } from 'next/headers';
import prisma from "@/prisma/prismaClient";

async function getCompany(slug: string) {

    const headerslist = headers();

    console.log(headerslist.get('x-forwarded-proto'));

    const res = await fetch(`${headerslist.get('x-forwarded-proto')}://${headerslist.get('host')}/api/company`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            slug: slug
        })
    }
    )

    console.log(JSON.stringify(res));


    if (!res.ok) {
        console.log('here the res', JSON.stringify(res))
        redirect('/');
    } else {
        return res.json();
    }
}


export default async function CompanyPage({ params }: { params: { slug: string } }) {

    const session = await getServerSession(authoptions);
    console.log(!session);

    if (!session) return redirect('/auth/login');
    console.log('here the session', session);

    const company = await getCompany(params.slug);
    console.log('here the cmpany', company);


    const _user = await prisma.user.findUnique({
        where: {
            email: session.user!.email as string
        },
        select: {
            CompanyEdu: {
                select: {
                    id: true
                }
            },
            role: true
        }
    });

    console.log('here the user', _user);

    if (!_user) return redirect('/auth/login');

    console.log(_user.role !== 'INT_ADMIN_EDU' && _user.CompanyEdu!.id !== company.id);


    if (_user.role !== 'INT_ADMIN_EDU' && _user.CompanyEdu!.id !== company.id) {
        throw new Error('You can only access your own company page');
    };


    return (
        <>
            <h1 className="text-white">Company Page</h1>
            <h1 className="text-white text-7xl">{company.name}</h1>
        </>

    )


}