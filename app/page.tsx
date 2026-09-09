'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const publicAsset = (fileName: string) => `${basePath}/assets/${encodeURIComponent(fileName)}`

const assets = {
  backEnvelope: publicAsset('close back of envelop with writng.png'),
  blankBackEnvelope: publicAsset('close back of envelop with out writng.png'),
  frontEnvelope: publicAsset('close front envelop.png'),
  openEnvelope: publicAsset('open envelop with paper in it.png'),
  paper: publicAsset('empty paper.png'),
  map: publicAsset('map icon.png'),
  ribbon: publicAsset('rouban.png'),
  lavender: publicAsset('flower 39.png'),
  rose: publicAsset('flower 68.png'),
  whiteRose: publicAsset('flower 1.png'),
  branch: publicAsset('flower 73.png'),
  wax: publicAsset('wax symbol.png'),
  sound: publicAsset('sound icon.png'),
  mute: publicAsset('mute icon.png'),
}

const stageLabels = [
  'پاکت را باز کنید',
  'مهر را لمس کنید',
  'نامه را بیرون بکشید',
  'دعوت‌نامه شما',
]

const createFlowerField = (previousField: Array<{ src: string }> = []) => {
  const flowerAssetFiles = Array.from({ length: 73 }, (_, index) => `flower ${index + 1}.png`)

  for (let i = flowerAssetFiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[flowerAssetFiles[i], flowerAssetFiles[j]] = [flowerAssetFiles[j], flowerAssetFiles[i]]
  }

  const previousSources = previousField.map((flower) => decodeURIComponent(flower.src.replace('/assets/', '')))
  const availableFiles = [...flowerAssetFiles]

  return Array.from({ length: 73 }, (_, index) => {
    const previousSource = previousSources[index]
    const usableFiles = availableFiles.filter((file) => file !== previousSource)
    const pickedFile = usableFiles[Math.floor(Math.random() * usableFiles.length)] ?? availableFiles[Math.floor(Math.random() * availableFiles.length)]
    const pickedIndex = availableFiles.indexOf(pickedFile)

    if (pickedIndex >= 0) availableFiles.splice(pickedIndex, 1)

    const duration = 9 + Math.random() * 9
    const left = `${(index * 17 + 11 + Math.random() * 10) % 96}%`
    const top = `${(index * 29 + 7 + Math.random() * 12) % 92}%`
    const delay = (index % 13) * 0.7 + Math.random() * 2.8

    return {
      id: `${Date.now()}-${Math.random()}-${index}`,
      src: publicAsset(pickedFile),
      tier: index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'small',
      left,
      top,
      rotation: `${(index * 29) % 44 - 22}deg`,
      delay: `${delay}s`,
      duration: `${duration}s`,
    }
  })
}

export default function Page() {
  const [stage, setStage] = useState(0)
  const [flowerField, setFlowerField] = useState<Array<ReturnType<typeof createFlowerField>[number]>>([])
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const pathname = usePathname() ?? '/'
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isAllowedHost =
    hostname === '10.92.254.109' ||
    hostname === 'ali-and-mahsa.noghteh.site' ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1'
  const [queryGuest, setQueryGuest] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setQueryGuest(params.get('guest') ?? '')
  }, [])

  const guestNameFromPath = isAllowedHost && pathname !== '/' ? decodeURIComponent(pathname.split('/').filter(Boolean)[0] || '') : ''
  const guestName = queryGuest || guestNameFromPath || ''
  const isPersonalized = Boolean(guestName)
  const backEnvelopeAsset = isPersonalized ? assets.blankBackEnvelope : assets.backEnvelope
  const envelopeGuestText = guestName ? `جناب ${guestName} شما و خانواده محترمتان را به این جشن دعوت مینماییم` : ''

  useEffect(() => {
    setFlowerField((current) => createFlowerField(current))
  }, [])

  useEffect(() => {
    if (stage === 4) document.body.classList.add('invitation-open')
    return () => document.body.classList.remove('invitation-open')
  }, [stage])

  const startMusic = () => {
    const audio = audioRef.current
    if (!audio || isMuted) return
    audio.volume = 0.28
    audio.play().catch(() => {})
  }

  const advance = () => {
    if (stage >= 4) return
    startMusic()
    setStage((current) => Math.min(current + 1, 4))
  }

  const toggleSound = () => {
    const audio = audioRef.current
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (!audio) return
    if (nextMuted) audio.pause()
    else audio.play().catch(() => {})
  }

  return (
    <main className={`invitation-app stage-${stage}`} dir="rtl">
      <audio ref={audioRef} loop preload="metadata" playsInline aria-hidden="true">
        <source src="/assets/song.mp3" type="audio/mpeg" />
      </audio>

      <div className="flower-field" aria-hidden="true">
        {flowerField.map((flower) => (
          <img
            key={flower.id}
            className={`floating-flower flower-${flower.tier}`}
            src={flower.src}
            alt=""
            style={{
              left: flower.left,
              top: flower.top,
              '--flower-rotation': flower.rotation,
              '--flower-delay': flower.delay,
              '--flower-duration': flower.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {stage < 4 ? (
        <section className="envelope-scene" aria-label="مراحل باز کردن دعوت‌نامه">
          <div className="scene-copy">
            <p className="eyebrow">A &amp; M</p>
            <h1>{stageLabels[stage]}</h1>
            <p className="hint">برای ادامه لمس کنید</p>
          </div>

          <button
            className={`envelope-button envelope-state-${stage}`}
            type="button"
            onClick={advance}
            aria-label={stage === 1 ? 'مهر قرمز را لمس کنید' : stageLabels[stage]}
          >
            <span className="envelope-stack">
              <img className="envelope-image back-envelope" src={backEnvelopeAsset} alt="پاکت نامه با متن دعوت" />
              {isPersonalized && (
                <span className="guest-envelope-text" aria-label={envelopeGuestText}>{envelopeGuestText}</span>
              )}
              <img className="envelope-image front-envelope" src={assets.frontEnvelope} alt="پاکت نامه بسته" />
              <img className="envelope-image open-envelope" src={assets.openEnvelope} alt="پاکت باز با کاغذ داخل آن" />
              <img className="envelope-image wax-seal" src={assets.wax} alt="مهر مومی A و M" />
            </span>
          </button>

        </section>
      ) : (
        <InvitationPaper assets={assets} guestName={guestName} />
      )}

      <div className="progress-dots" aria-label={`مرحله ${stage + 1} از 5`}>
        {[0, 1, 2, 3, 4].map((dot) => (
          <span key={dot} className={dot <= stage ? 'active' : ''} />
        ))}
      </div>

      <button className="sound-button" type="button" onClick={toggleSound} aria-label={isMuted ? 'فعال کردن صدا' : 'بی‌صدا کردن'}>
        <img src={isMuted ? assets.mute : assets.sound} alt="" />
      </button>
    </main>
  )
}

function InvitationPaper({ assets, guestName }: { assets: Record<string, string>; guestName: string }) {
  return (
    <section className="paper-scene" aria-label="دعوت‌نامه عروسی">
      <img className="paper-texture" src={assets.paper} alt="" aria-hidden="true" />
      <img className="paper-wax" src={assets.wax} alt="مهر مومی A و M" />
      <img className="paper-flower paper-flower-top" src={assets.whiteRose} alt="" aria-hidden="true" />
      <img className="paper-flower paper-flower-bottom" src={assets.lavender} alt="" aria-hidden="true" />
      <img className="paper-rose" src={assets.rose} alt="" aria-hidden="true" />
      <div className="paper-content">
        {/* <p className="paper-kicker">به نام عشق</p> */}
        <p className="paper-intro">با نهایت شوق و افتخار</p>
        {/* <h1>آغاز قصه‌ی ما</h1> */}
        <div className="monogram">علی <span>&amp;</span> مهسا</div>
        <p className="paper-message">{guestName ? `جناب ${guestName} شما و خانواده محترمتان را به این جشن دعوت مینماییم` : 'شما و خانواده محترمتان را به این جشن دعوت مینماییم'}</p>
        <div className="details-grid">
          <div><span>تاریخ</span><strong>جمعه، ۹ مهر</strong></div>
          <div><span>ساعت</span><strong>۱۹:۳۰</strong></div>
          <div><span>مکان</span><strong>باغ عمارت آینه</strong></div>
        </div>
        <button className="map-link" type="button">
          <img src={assets.map} alt="" />
          مشاهده موقعیت روی نقشه
        </button>
      </div>
    </section>
  )
}
