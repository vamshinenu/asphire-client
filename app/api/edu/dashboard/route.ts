import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../../auth/[...nextauth]/route";

async function getCandidates(req: NextRequest) {

    console.log(req.url);

    const pageSize = req.nextUrl.searchParams.get('pagesize');
    const pageNumber = req.nextUrl.searchParams.get('pagenumber');
    const searchTerm = req.nextUrl.searchParams.get('search');
    const sortTerm = req.nextUrl.searchParams.get('sort');

    console.log({
        pageSize,
        pageNumber,
        searchTerm,
        sortTerm
    });

    const session = await getServerSession(authoptions);
    console.log(session);

    if (!session) {
        redirect("/auth/login");
    }

    if (!session.user && !session.user!.email) {
        redirect("/auth/login");
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user!.email as string,
        },
        select: {
            id: true,
            name: true,
            role: true,

            memberOfCompany: {
                select: {
                    id: true
                }
            },
            accesses: {
                select: {
                    id: true,
                    stage: true,
                }
            }
        }
    });

    if (!currentUser) {
        redirect('/auth/login');
    }

    if (currentUser.role === 'INT_CANDIDATE' || currentUser.role === 'EXT_CANDIDATE') {
        redirect('/auth/error?error=accessdenied');
    }

    let queryFilter: any = {}
    const intAdmin = {
        cadidateStages: {
            some: {
                current: true,
            }
        },
    }

    const intUser = {
        cadidateStages: {
            some: {
                stage: {
                    in: currentUser.accesses.map(access => access.stage),
                },
                current: true,
            }
        },
    };

    const extUser = {
        cadidateStages: {
            some: {
                stage: {
                    in: currentUser.accesses.map(access => access.stage),
                },
                current: true,
            }
        },

        memberOfCompanyId: currentUser.memberOfCompany?.id as string,
    };

    const extAdmin = {
        cadidateStages: {
            some: {
                current: true,
            }
        },

        memberOfCompanyId: currentUser.memberOfCompany?.id as string,
    };

    queryFilter = intAdmin;

    if (currentUser.role === 'INT_USER') {
        queryFilter = intUser;
    } else if (currentUser.role === 'EXT_USER') {
        queryFilter = extUser;
    } else if (currentUser.role === 'EXT_ADMIN') {
        queryFilter = extAdmin;
    }

    let searchFilter = searchTerm ? { name: { contains: searchTerm } } : {};
    let sortFilter = sortTerm ? (sortTerm === "desc" ? { createdAt: 'desc' } : { createdAt: 'asc' }) : { createdAt: 'desc' } as any;

    const candidates = await prisma.user.findMany({
        where: {
            ...queryFilter,
            ...searchFilter,
        },
        orderBy: sortFilter,
        select: {
            id: true,
            name: true,
            email: true,
            memberOfCompany: {
                select: {
                    id: true,
                    name: true,
                }
            },
            cadidateStages: {
                select: {
                    stage: true,
                    status: true,
                    createdAt: true,
                    actor: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    },
                    messages: {
                        select: {
                            id: true,
                            User: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            },
                            message: true,
                        }
                    }
                }
            },
        },
        take: pageSize ? parseInt(pageSize as string) : 10,
        skip: pageNumber ? (parseInt(pageNumber as string) - 1) * parseInt(pageSize as string) : 0,
    });

    console.log({
        currentUser,
        candidates
    });

    return NextResponse.json({ candidates });
}

export { getCandidates as GET }
