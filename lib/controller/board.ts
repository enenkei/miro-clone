'use server';
import { Board } from "@prisma/client";
import { prisma } from "../db";
import { RESPONSE_MESSAGES } from "../constants";

export type BoardProps = {
    authorId: string,
    authorName: string,
    orgId: string,
    title: string
}

const images = [
    "/images/placeholders/writing_agenda_document_pencil_paper_notes_icon_262803.svg",
    "/images/placeholders/easel_canvas_design_art_paint_painting_icon_262780.svg",
    "/images/placeholders/tool_repair_utensils_tools_construction_toolkit_build_toolbox_icon_262799.svg",
    "/images/placeholders/set_pencil_brush_paint_design_art_tools_drawing_icon_262791.svg",
    "/images/placeholders/cut_material_office_craft_handcraft_design_art_scissors_icon_262821.svg",
    "/images/placeholders/repair_home_diy_tools_construction_hammer_screw_carpenter_icon_262826.svg",
    "/images/placeholders/pen_writing_edit_utensils_tools_education_marker_icon_262809.svg",
    "/images/placeholders/equipment_pliers_tool_work_tools_construction_plier_icon_262800.svg",
    "/images/placeholders/woodcutter_craft_bush_tools_construction_axe_wood_icon_262789.svg",
    "/images/placeholders/utensils_tools_design_and_art_cut_carpentry_blade_cutter_icon_262792.svg",
    "/images/placeholders/material_school_crafts_bottle_liquid_glue_icon_262788.svg"
]

export const createBoard = async ({ authorId, authorName, orgId, title }: BoardProps): Promise<Board> => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await prisma.board.create({
        data: {
            authorId,
            authorName,
            imageUrl: randomImage,
            orgId,
            title
        }
    });
    return board || undefined;
}

export const getBoards = async (authorId: string, orgId: string): Promise<Board[]> => {
    const boards = await prisma.board.findMany({
        where: {
            orgId,
            authorId
        },
        include : {
            userFavorite : true
        }
    });
    return boards;
}

export const deleteBoard = async (boardId: string, authorId: string): Promise<String> => {
    try {
        await prisma.board.delete({
            where: {
                id: boardId,
                authorId
            }
        });
        return RESPONSE_MESSAGES.DELETED;
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
}

export const updateBoard = async (boardId: string, title: string): Promise<String> => {
    try {
        const board = await prisma.board.update({
            data: {
                title
            },
            where: {
                id: boardId
            }
        });
        if (board) {
            return RESPONSE_MESSAGES.UPDATED;
        }
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
    return RESPONSE_MESSAGES.UNDEFINED;
}

export const addFavorite = async (boardId: string, orgId: string, userId: string): Promise<String> => {
    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId
            }
        });
        if (board) {
            const favorite = await prisma.userFavorite.findFirst({
                where: {
                    userId,
                    orgId,
                    boardId
                }
            });
            if (favorite) {
                return RESPONSE_MESSAGES.DATA_EXISTED;
            }
            await prisma.userFavorite.create({
                data: {
                    userId,
                    orgId,
                    boardId
                }
            });
            return RESPONSE_MESSAGES.UPDATED;
        }
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
    return RESPONSE_MESSAGES.UNDEFINED;
}

export const removeFavorite = async (boardId: string, orgId: string, userId: string): Promise<String> => {
    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId
            }
        });
        if (board) {
            const favorite = await prisma.userFavorite.findFirst({
                where: {
                    userId,
                    orgId,
                    boardId
                }
            });
            if (favorite) {
                await prisma.userFavorite.delete({
                    where: {
                        id: favorite.id
                    }
                })
                return RESPONSE_MESSAGES.UPDATED;
            }
        }
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
    return RESPONSE_MESSAGES.UNDEFINED;
}

export const getBoard = async (boardId : string) : Promise<Board | null> => {
    const board = await prisma.board.findUnique({
        where : {
            id : boardId
        }
    });
    return board;
}