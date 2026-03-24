import Image from 'next/image'

function NoData({ message = 'Such emptiness...' }: { message?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.6, height: '100%' }}>
      <Image src="/nodata.svg" alt="No data" width={180} height={180} />
      <span style={{ fontSize: 16, fontStyle: 'italic' }}>{message}</span>
    </div>
  )
}

export default NoData