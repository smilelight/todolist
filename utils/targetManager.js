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
  
}

export default TargetManager