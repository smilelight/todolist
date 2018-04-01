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
}

export default PlanManager