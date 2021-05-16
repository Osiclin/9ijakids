import styles from '../styles/Card.module.css'

export default function Card(props) {
    return(
        <div className={styles.card}>
            <img className={styles.iimg} src={props.src} width="300px" height="300px"/>
            <h3 className={styles.title}>{props.title}</h3>
            <ul>
                <li>subject: {props.subject}</li>
                <li>topic: {props.topic}</li>
                <li>group: {props.group}</li>
                <li>level: {props.level}</li>
            </ul>
            <p>{props.description}</p>
        </div>
    )
}