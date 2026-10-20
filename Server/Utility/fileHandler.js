import fs from "fs/promises";

export const deleteOldFile = async(oldData)=>{
    await fs.unlink(`src/${oldData}`);
}