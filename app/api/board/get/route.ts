import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const boardId = req.nextUrl.searchParams.get("boardId");
        const { userId } = getAuth(req);
        if (userId && boardId) {
            // console.log(search);
            const board = await prisma.board.findUnique({
                where: {
                    id: boardId,
                },
                include: {
                    userFavorite: true
                }
            });
            if (board) {
                return NextResponse.json({ board }, { status: 200 });
            }
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Internal error' }, { status: 500 });
    }
    return NextResponse.json({ message: 'No action' }, { status: 200 });
}