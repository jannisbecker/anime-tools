'use client'

import { getAnimeCharactersAndSeiyuus } from 'api/anilist'
import { CharacterWithSeiyuus, Anime } from 'api/anilist/types'
import Checkbox from 'app/base-ui/Checkbox'
import { AuthContext } from '../AuthContext'
import { useContext, useState } from 'react'
import AnimeSearchInput from './AnimeSearchInput'
import SeiyuuCharacterCard from './CharacterCard'
import SeiyuuOtherRolesColumn from './SeiyuuRolesColumn'

export default function VoiceActorsPage() {
  const { loggedIn } = useContext(AuthContext)

  const [characterResults, setCharacterResults] = useState<
    CharacterWithSeiyuus[]
  >([])

  const [showUserAnime, setShowUserAnime] = useState(false)

  function onAnimeSelected(anime: Anime) {
    getAnimeCharactersAndSeiyuus(anime.id).then((res) =>
      setCharacterResults(res)
    )
  }

  return (
    <div className="flex flex-grow flex-col overflow-auto">
      <div className="flex items-center justify-center gap-8 py-4">
        <AnimeSearchInput onAnimeSelected={onAnimeSelected} />
        <Checkbox
          label="Only my Anime"
          disabled={!loggedIn}
          checked={showUserAnime}
          onChange={(e) => setShowUserAnime(e.target.checked)}
        />
      </div>

      <div className="grid h-full grid-flow-col place-content-start gap-4 overflow-auto px-5 pb-5">
        {characterResults.map((character) => (
          <div key={character.id} className="flex w-[250px] flex-col gap-4">
            <SeiyuuCharacterCard character={character} />

            {character.seiyuus[0] && (
              <SeiyuuOtherRolesColumn
                seiyuu={character.seiyuus[0]}
                excludeCharacterId={character.id}
                showUserAnime={showUserAnime}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
