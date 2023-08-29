import { animated, useTransition } from '@react-spring/web'
import { type ReactNode, useRef, useState } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  const linkMap: Record<string, string> = {
    '/welcome/1': '/welcome/2',
    '/welcome/2': '/welcome/3',
    '/welcome/3': '/welcome/4',
    '/welcome/4': '/welcome/xxx',
  }
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translate(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
    }
  })
  return (
    <div flex flex-col items-stretch bg="#6335c3"
        h-screen
    >
      <header shrink-0 text-center my-10px mt-60px>
        <img src={logo} w-65px h-70px/>
        <h1 text="#dccff6" text-28px my-5px>山竹记账</h1>
      </header>
      <main grow-1 shrink-1 relative>
        {transitions((style, pathname) =>
            <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%">
              <div flex justify-center items-center bg="#ffffff" rounded-8px mx-16px h="100%">
                {map.current[pathname]}
              </div>
            </animated.div>
        )}
      </main>
      <footer shrink-0 text-center mt-40px mb-24px grid grid-cols-3 grid-rows-1>
        <Link style={{ gridArea: '1 / 2 / 2 / 3' }} text-28px text="#dccff6" to={linkMap[location.pathname]}>下一页</Link>
        <Link style={{ gridArea: '1 / 3 / 2 / 4' }} text-28px text="#dccff6" to='/welcome/xxx'>跳过</Link>
      </footer>
    </div>
  )
}
