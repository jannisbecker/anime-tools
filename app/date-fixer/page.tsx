import Button from 'app/base-ui/Button'
import LoadingIndicator from 'app/base-ui/LoadingIndicator'
import { AuthContext } from 'context/AuthContext'
import { useAnilistDateFixer } from 'hooks/useAnilistDateFixer'
import { ReactNode, useContext } from 'react'
import DateFixChangePreviewTable from './DateFixChangePreviewTable'

export default function DateFixerPage() {
  const { loggedIn, userInfo, login } = useContext(AuthContext)

  const { state, calculateChanges } = useAnilistDateFixer(userInfo?.id)

  const currentStepHtml = (): ReactNode => {
    switch (state.status) {
      case 'idle':
        return (
          <>
            <span className="text-textPrimary">
              Click 'Start' to run the Date Fixer
            </span>
            <Button label="Start" onClick={calculateChanges} />
          </>
        )
      case 'downloading':
        return (
          <>
            <LoadingIndicator />
            <span className="text-textPrimary">Downloading...</span>
          </>
        )
      case 'calculation_done':
        return <DateFixChangePreviewTable changeList={state.changeList as []} />
      case 'uploading':
        return <span className="text-textPrimary">Uploading...</span>
    }
  }

  return (
    <div className="flex flex-grow flex-col overflow-auto">
      <div className="container mx-auto">
        <div className="my-6 flex flex-col items-center">
          {loggedIn ? (
            currentStepHtml()
          ) : (
            <>
              <div className="text-textSecondary">
                To use this tool, please login to your AniList account
              </div>
              <Button label="Login to Anilist" onClick={login} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
