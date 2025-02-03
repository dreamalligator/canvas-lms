/*
 * Copyright (C) 2025 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react'
import {Flex} from '@instructure/ui-flex'
import {TextInput} from '@instructure/ui-text-input'
import {IconButton} from '@instructure/ui-buttons'
import {IconTrashLine} from '@instructure/ui-icons'
import {useScope as createI18nScope} from '@canvas/i18n'
import {ScreenReaderContent} from '@instructure/ui-a11y-content'
import {Text} from '@instructure/ui-text'
import {View} from '@instructure/ui-view'

const I18n = createI18nScope('differentiation_tags')

export type TagState = {
  id: number
  name: string
}

export type TagInputRowProps = {
  tag: TagState
  index: number
  totalTags: number
  error?: string
  onChange: (id: number, value: string) => void
  onRemove: (id: number) => void
  inputRef?: (el: HTMLInputElement | null) => void
}

const TagInputRow: React.FC<TagInputRowProps> = ({
  tag,
  index,
  totalTags,
  error,
  onChange,
  onRemove,
  inputRef,
}) => {
  return (
    <Flex direction="column" margin="0 0 medium 0">
      <View margin="0 0 small 0">
        <Text weight="bold">
          {totalTags > 1
            ? I18n.t('Tag Name (Variant %{tagCount}) *', {tagCount: index + 1})
            : I18n.t('Tag Name *')}
        </Text>
      </View>

      <Flex alignItems="start">
        <TextInput
          inputRef={inputRef}
          name={`tag-name-${tag.id}`}
          renderLabel={
            <ScreenReaderContent>
              {totalTags > 1
                ? I18n.t('Tag Name (Variant %{tagCount})', {tagCount: index + 1})
                : I18n.t('Tag Name')}
            </ScreenReaderContent>
          }
          display="inline-block"
          width={totalTags > 1 ? '95%' : '100%'}
          value={tag.name}
          onChange={e => onChange(tag.id, e.target.value)}
          messages={
            error
              ? [
                  {
                    text: error,
                    type: 'error',
                  },
                ]
              : undefined
          }
          isRequired
        />
        {totalTags > 1 && (
          <IconButton
            screenReaderLabel={I18n.t('Remove tag')}
            onClick={() => onRemove(tag.id)}
            withBackground={false}
            withBorder={false}
            color="primary"
            width="5%"
            data-testid="remove-tag"
          >
            <IconTrashLine />
          </IconButton>
        )}
      </Flex>
    </Flex>
  )
}

export default TagInputRow
