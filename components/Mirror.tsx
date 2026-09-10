export function Mirror({className='',children}:{className?:string;children?:React.ReactNode}){return <div className={`mirror ${className}`} aria-hidden={!children}><div className="mirror__glass"><i/><i/><i/>{children}</div></div>}

