import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const orgId = req.nextUrl.searchParams.get("orgId");
        const search = req.nextUrl.searchParams.get("search");
        const { userId } = getAuth(req);
        if (userId) {
            console.log(search);
            const boards = await prisma.board.findMany({
                where: {
                    authorId: userId,
                    orgId
                },
                include : {
                    userFavorite : true
                }
            });
            if (boards?.length > 0) {
                return NextResponse.json({ boards }, { status: 200 });
            }
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Internal error' }, { status: 500 });
    }
    return NextResponse.json({ message: 'No action' }, { status: 200 });
}