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

}

export default PlanManager