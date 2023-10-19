// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../models";
import { hashSync, genSalt } from "bcrypt";
export async function GET() {
  try {
    const result = await models.User.findAll();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const salt: string = await genSalt(10);
    data.password = hashSync(data.password, salt);
    const result = await models.User.create({
      id: v4(),
      ...data,
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}
