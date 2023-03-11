import wip from '../../styles/images/wip.png'

export default function WIP() {
    return(
        <section id='WIP'>
            <div className='txt'>
                <h1>This page is under construction!</h1>
                <p>Give it a few days :D</p>
            </div>
            <img src={wip.src}/>
        </section>
    )
}