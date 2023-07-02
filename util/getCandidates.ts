import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getCandidates() {


    // console.log({
    //     pageSize,
    //     pageNumber
    // })

    const session = await getServerSession(authoptions);

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
            CompanyEdu: {
                select: {
                    id: true
                }
            }
            , AccessEdu: {
                select: {
                    id: true,
                    stage: true,
                }
            }
        }
    });

    console.log(currentUser);

    if (!currentUser) {
        redirect('/auth/login');
    }
    let users: any = [];

    if (currentUser.role === 'INT_CANDIDATE_EDU' || currentUser.role === 'EXT_CANDIDATE_EDU') {
        redirect('/auth/error?error=accessdenied');
    }

    let queryFilter: any = {}

    const intAdmin = {
        stages: {
            some: {
                current: true,
            }
        },
    }

    const intUser = {
        stages: {
            some: {
                stage: {
                    in: currentUser.AccessEdu.map(access => access.stage),
                },
                current: true,
            }
        },
    };

    const extUser = {
        stages: {
            some: {
                stage: {
                    in: currentUser.AccessEdu.map(access => access.stage),
                },
                current: true,
            }
        },
        companyId: currentUser.CompanyEdu?.id as string,
    };

    const extAdmin = {
        stages: {
            some: {
                current: true,
            }
        },
        companyId: currentUser.CompanyEdu?.id as string,
    };

    queryFilter = intAdmin;

    if (currentUser.role === 'INT_USER_EDU') {
        queryFilter = intUser;
    } else if (currentUser.role === 'EXT_USER_EDU') {
        queryFilter = extUser;
    }
    else if (currentUser.role === 'EXT_ADMIN_EDU') {
        queryFilter = extAdmin;
    }

    const candidates = await prisma.candidateEdu.findMany({
        where: queryFilter,
        select: {
            userId: true,
            stages: {
                select: {
                    stage: true,
                    status: true,
                    message: true,
                    createdAt: true,
                    Actor: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            companyEdu: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        // take: pageSize,
        // skip: (pageNumber - 1) * pageSize
    }

    )
    console.log(candidates);
    candidates.forEach(candidate => {
        console.log(candidate.companyEdu.name);
    })
    console.log(currentUser)

    console.log({
        currentUser,
        candidates
    });


    return { currentUser, candidates }

}


export default getCandidates;