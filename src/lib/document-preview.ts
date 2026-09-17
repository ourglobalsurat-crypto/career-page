import {fromBuffer} from 'yauzl';
import {extractRawText} from 'mammoth';
async function checkArchive(buffer:Buffer) {
  await new Promise<void>((resolve,reject)=>{
    fromBuffer(buffer,{lazyEntries:true,validateEntrySizes:true},(error,zip)=>{
      if(error || !zip){reject(error || new Error('Invalid archive'));return;}
      let count=0,total=0;const limit=20*1024*1024;
      const fail=(error:Error)=>{zip.close();reject(error);};
      zip.on('error',fail);zip.on('end',resolve);
      zip.on('entry',entry=>{
        if(++count>200 || entry.uncompressedSize>limit || entry.generalPurposeBitFlag & 1){fail(new Error('Unsupported archive'));return;}
        zip.openReadStream(entry,(error,stream)=>{
          if(error || !stream){fail(error || new Error('Invalid entry'));return;}
          stream.on('error',fail);
          stream.on('data',(chunk:Buffer)=>{total+=chunk.length;if(total>limit){stream.destroy();fail(new Error('Preview too large'));}});
          stream.on('end',()=>zip.readEntry());
        });
      });zip.readEntry();
    });
  });
}
export async function documentTextPreview(buffer:Buffer) {
  await checkArchive(buffer);
  const {value}=await extractRawText({buffer});
  return value.slice(0,100000);
}
