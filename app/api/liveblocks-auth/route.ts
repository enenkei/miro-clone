import { prisma } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { NextRequest, NextResponse } from 'next/server';

const liveblocks = new Liveblocks({
    secret: "sk_dev_FebSO_C_PHgfoLRwnnNl5zYBW4oN19U0xUjmFXz2xaC_rXZSyNPwevkgvGSknbK1"
});

export async function POST(req: NextRequest) {
    const authorization = await auth();
    const user = await currentUser();
    // console.log(authorization);
    if (!authorization || !user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    const { room } = await req.json();
    const board = await prisma.board.findFirst({
        where: {
            id: room
        }
    });
    // console.log("AUTH_INFO", {
    //     room,
    //     board
    // });
    if (board?.orgId !== authorization.orgId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    const userInfo = {
        name: user.firstName || 'Anonymous',
        picture: user.imageUrl!
    };
    const session = liveblocks.prepareSession(
        user.id,
        { userInfo }
    );
    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }
    const { status, body } = await session.authorize();
    // console.log({status, body}, "ALLOWED");
    return new Response(body, {status});
}