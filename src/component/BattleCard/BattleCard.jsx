import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import Card from '../../lib/Card'
import { robotsState } from '../../state'
import styles from './BattleCard.module.css'
import RobotBattleCard from '../RobotBattleCard'
import classes from '../../lib/classes'

const BattleCard = battle => {
  const robotsStateValues = useRecoilValue(robotsState)

  const robots = useMemo(
    () =>
      robotsStateValues
        .map(r => battle.robots.includes(r.id) && r)
        .filter(Boolean),
    [battle.robots, robotsStateValues],
  )

  const renderSide = robot => (
    <div key={robot.id} className={styles.BattleCard_side}>
      <h3
        className={classes({
          [styles.BattleCard_side_winner]: battle.win === robot.id,
          [styles.BattleCard_side_looser]: battle.win !== robot.id,
        })}
      >
        {battle.win === robot.id ? 'Winer' : 'Looser'}
      </h3>
      <RobotBattleCard {...robot} />
    </div>
  )

  const renderVS = () => <div className={styles.BattleCard_vs}>VS</div>

  return (
    <Card className={styles.BattleCard}>
      {renderSide(robots[0])}
      {renderVS()}
      {renderSide(robots[1])}
    </Card>
  )
}

export default BattleCard
