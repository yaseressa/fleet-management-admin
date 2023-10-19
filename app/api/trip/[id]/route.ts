import { NextRequest, NextResponse } from "next/server";
import models from "../../../../models";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const result = await models.Trip.findOne({
      where: { id },
      include: [
        { model: models.Vehicle },
        { model: models.Booking },
        { model: models.Driver },
      ],
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const deleted = await models.Trip.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: `Trip ${id} was deleted.` });
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const updated = await models.Trip.update(
      { ...data },
      {
        where: { id },
      }
    );
    return NextResponse.json({ message: `Trip ${id} was updated.` });
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}
