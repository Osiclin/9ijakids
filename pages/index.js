import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [details, setDetails] = useState([])
  const [groups, setGroups] = useState([])

  const Search = async (e) => {
    console.log('hi')
    const res = await fetch('/api/hello')
    const data = await res.json()
    const val = e.target.value

    const search = data.filter(item => val.toUpperCase() === item.Topic.toUpperCase())

    if (search.length < 1) {
      setDetails(data)
    } else {
      setDetails(search)
    }
  }

  const Filter = async (e) => {
    const res = await fetch('/api/hello')
    const data = await res.json()

    if (e.target.className === 'Home_groups__cC5a2') {
      const a = data.filter(detail => detail.Group === e.target.value)
      setDetails(a)
      return
    } else if (e.target.className === 'Home_levels__1T5Nt') {
      const a = data.filter(detail => detail.Level === e.target.value)
      setDetails(a)
      return
    } else {
      console.log(data)
      setDetails(data)
      return
    }
  }

  useEffect(() => {
    let mounted = true

    fetch("/api/hello")
    .then(res => res.json())
    .then(data => {
      if (mounted) {
        setDetails(data)
        setGroups(data)
      }
    })
    .catch(err => console.log(err))

    return () => mounted = false
  }, [])
 
  return (
    <div className={styles.container}>
      <Head>
        <title>9ijakids Game</title>
        <meta name="description" content="A list of games for kids" />
        <link rel="icon9ijakids.com" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div className={styles.logo}>
          <Image src="https://9ijakids.com/wp-content/uploads/2020/06/cropped-9ijakids_logo___160px-2.png" width={150} height={100} />
          </div>

          <div className={styles.inputwrapper}>
            <input className={styles.search} type="search" placeholder="Search for games by topic e.g. social studies" onChange={(e) => Search(e)} />
            
            <div className={styles.filtercontainer}>
              <span className={styles.filterby}>filter by:</span>
              <select className={styles.groups} onChange={(e) => Filter(e)}>
                <option>All</option>
                {
                  groups.map((group, index) => <option key={index}>{group.Group}</option>)
                }
              </select>
              <select className={styles.levels} onChange={(e) => Filter(e)}>
                <option>All</option>
                {
                  groups.map((group, index) => <option key={index}>{group.Level}</option>)
                }
              </select>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {
            details.map((detail, index) => <Card key={index} src={detail.GameImage} title={detail.GameTitle} subject={detail.Subject} topic={detail.Topic} group={detail.Group} level={detail.Level} description={detail.GameDescription} />)
          }
        </div>
      </main>
    </div>
  )
}
