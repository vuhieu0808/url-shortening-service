import mongoose, { Document, Schema } from "mongoose";

function toBase62(id: mongoose.Types.ObjectId): string {
  const BASE62 =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let num = BigInt("0x" + id.toHexString());
  let result = "";

  while (num > 0n) {
    result = BASE62[Number(num % 62n)] + result;
    num = num / 62n;
  }

  return result || "0";
}

interface IUrl extends Document {
  url: string;
  shortCode: string;
  accessCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    url: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      unique: true,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

urlSchema.pre("save", async function () {
  if (this.isNew) {
    this.shortCode = toBase62(this._id as mongoose.Types.ObjectId);
  }
});

const Url = mongoose.model<IUrl>("Url", urlSchema);

export { Url, IUrl };
