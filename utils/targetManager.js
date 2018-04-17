import Target from '../models/Target'
import targetStore from '../store/targetStore'

class TargetManager {
  constructor(targets){
    this.targets = null
    if(targets){
      this.targets = targets
    } else {
      this.targets = targetStore.getTargets()
    }
  }
  getUncompleteds(){
    return this.targets.filter(target => target.completed == false)
  }

  getCompleteds() {
    return this.targets.filter(target => target.completed == true)
  }
}

export default TargetManager