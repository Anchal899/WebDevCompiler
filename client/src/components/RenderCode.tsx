import { RootState } from '@/redux/store'
import compilerSlice from '@/redux/slices/compilerSlice';
import { useSelector } from 'react-redux'

export default function RenderCode() {
  const currentLanguage=useSelector(
    (state:RootState) => state.compilerSlice.currentLanguage
    );
    const fullCode=useSelector((state:RootState)=>state.compilerSlice.fullCode);
    const combinedCode=`
    <html>
    <head>
    <style>
    ${fullCode.css}
    </style>
    </head>
    <body>
    ${fullCode.html}
    </body>
    <script>
    ${fullCode.javascript}
    </script>
    </html>
    `
    const iframeCode=`data:text/html;charset=utf-8,${encodeURIComponent(combinedCode)}`;
  return (
    <div className='bg-white border-2 border-white-500 h-[calc(100dvh-60px)]'>
      <iframe className='w-full h-full' src={iframeCode}></iframe>
    </div>
  );
}

