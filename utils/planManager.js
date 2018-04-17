import Plan from '../models/Plan'
import planStore from '../store/planStore'

class PlanManager {
  constructor(plans) {
    this.plans = null
    if (plans) {
      this.plans = plans
    } else {
      this.plans = planStore.getPlans()
    }
  }

  filterByTargetId(uuid) {
    return this.plans.filter(plan => plan.targetId == uuid)
  }

  getStatisticsByDate() {
    let result = []
    let plans = this.plans
    let temp = {}
    plans.forEach((item) => {
      temp[item.completedAt] = temp[item.completedAt] ? temp[item.completedAt] + 1 : 1
    })
    for (let key in temp) {
      result.push({
        completedAt: key,
        count: temp[key]
      })
    }
    result = result.sort((a, b) => (a.completedAt > b.completedAt))
    console.log("getStatics:",result)
    return result
  }

  getUncompleteds() {
    return this.plans.filter(plan => plan.completed == false)
  }

  getCompleteds() {
    return this.plans.filter(plan => plan.completed == true)
  }
}

export default PlanManager