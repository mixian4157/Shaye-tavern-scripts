<template>
  <div class="app-wrapper">
    <!-- 左侧：标签页导航 -->
    <div class="tab-navigation">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <!-- 右侧：主要内容面板 -->
    <div class="health-container">
      <div v-if="activeTab !== 1 && activeTab !== 2" class="health-header">
        <i :class="tabs[activeTab].icon"></i>
        <h2>{{ tabs[activeTab].name }}</h2>
      </div>

      <!-- 标签页内容 -->
      <div class="tab-content">
        <!-- 主标签页：主要信息 -->
        <div v-if="activeTab === 0" class="tab-panel">
          <div class="health-panel">
            <!-- 角色选择按钮区域 -->
            <div class="character-selector-header">
              <div class="selector-label">
                <i class="fas fa-users"></i>
                <span>选择角色</span>
              </div>
              <div class="character-buttons">
                <button
                  v-for="char in partyCharacters"
                  :key="char"
                  :class="['character-button', { active: selectedCharacter === char }]"
                  @click="selectedCharacter = char"
                >
                  <i class="fas fa-user"></i>
                  <span>{{ char }}</span>
                </button>
              </div>
            </div>

            <div class="health-content">
              <!-- 上方：两列布局 -->
              <div class="health-top-section">
                <!-- 左侧：角色信息 -->
                <div class="character-info">
                  <!-- 移动端折叠标题 -->
                  <div
                    class="mobile-collapse-header"
                    @click="collapsedSections.characterInfo = !collapsedSections.characterInfo"
                  >
                    <i class="fas fa-user"></i>
                    <span>角色信息</span>
                    <i
                      :class="[
                        'fas',
                        collapsedSections.characterInfo ? 'fa-chevron-down' : 'fa-chevron-up',
                        'collapse-icon',
                      ]"
                    ></i>
                  </div>
                  <div v-if="!collapsedSections.characterInfo" class="character-info-content">
                    <!-- 第一行：名称、等级、生命阶层 -->
                    <div class="info-row">
                      <div class="info-item">
                        <div class="info-label">
                          <i class="fas fa-user"></i>
                          <span>名称</span>
                        </div>
                        <div class="info-value">{{ characterName || '未知' }}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">
                          <i class="fas fa-level-up-alt"></i>
                          <span>等级</span>
                        </div>
                        <div class="info-value">{{ characterLevel || '未知' }}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">
                          <i class="fas fa-layer-group"></i>
                          <span>生命阶层</span>
                        </div>
                        <div class="info-value">{{ characterLifeTier || '未知' }}</div>
                      </div>
                    </div>

                    <!-- 第二行：种族、年龄 -->
                    <div class="info-row">
                      <div class="info-item small">
                        <div class="info-label">
                          <i class="fas fa-dragon"></i>
                          <span>种族</span>
                        </div>
                        <div class="info-value">{{ characterRace || '未知' }}</div>
                      </div>
                      <div class="info-item small">
                        <div class="info-label">
                          <i class="fas fa-birthday-cake"></i>
                          <span>年龄</span>
                        </div>
                        <div class="info-value">{{ characterAge || '未知' }}</div>
                      </div>
                    </div>

                    <!-- 第三行：身份、精神状态 -->
                    <div class="info-row">
                      <div class="info-item small">
                        <div class="info-label">
                          <i class="fas fa-crown"></i>
                          <span>身份</span>
                        </div>
                        <div class="info-value">{{ characterIdentity || '未知' }}</div>
                      </div>
                      <div class="info-item small">
                        <div class="info-label">
                          <i class="fas fa-brain"></i>
                          <span>精神状态</span>
                        </div>
                        <div class="info-value">{{ mentalState || '未知' }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 右侧：状态条 -->
                <div class="status-bars">
                  <!-- 移动端折叠标题 -->
                  <div
                    class="mobile-collapse-header"
                    @click="collapsedSections.statusBars = !collapsedSections.statusBars"
                  >
                    <i class="fas fa-heart"></i>
                    <span>状态信息</span>
                    <i
                      :class="[
                        'fas',
                        collapsedSections.statusBars ? 'fa-chevron-down' : 'fa-chevron-up',
                        'collapse-icon',
                      ]"
                    ></i>
                  </div>
                  <div v-if="!collapsedSections.statusBars" class="status-bars-content">
                    <div v-for="status in statusBars" :key="status.key" class="health-item">
                      <div class="health-label">
                        <i :class="status.icon"></i>
                        <span>{{ status.label }}</span>
                      </div>
                      <div class="health-bar-container">
                        <div
                          class="health-bar-fill"
                          :class="status.class"
                          :style="{ width: status.percent + '%' }"
                        ></div>
                      </div>
                      <div class="health-value">{{ status.current }} / {{ status.max }}</div>
                    </div>

                    <!-- 灵魂觉醒度 -->
                    <div class="soul-awakening">
                      <div class="soul-label">
                        <i class="fas fa-fire"></i>
                        <span>灵魂觉醒度</span>
                      </div>
                      <div class="circular-progress-container">
                        <svg class="circular-progress" viewBox="0 0 100 100">
                          <defs>
                            <!-- 定义圆形裁剪路径 -->
                            <clipPath id="circleClip">
                              <circle cx="50" cy="50" r="45" />
                            </clipPath>
                            <!-- 定义液体填充的裁剪路径（从底部向上） -->
                            <clipPath :id="`liquidClip-${soulAwakeningPercent}`">
                              <rect
                                x="5"
                                :y="50 + 45 - 45 * 2 * (soulAwakeningPercent / 100)"
                                width="90"
                                :height="45 * 2 * (soulAwakeningPercent / 100)"
                              />
                            </clipPath>
                          </defs>
                          <!-- 背景圆 -->
                          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 0, 0, 0.3)" stroke-width="8" />
                          <!-- 液体填充（使用圆形，通过clipPath控制高度） -->
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="#4a4a4a"
                            :clip-path="`url(#liquidClip-${soulAwakeningPercent})`"
                            class="liquid-fill"
                          />
                          <!-- 液体表面高光效果 -->
                          <circle
                            v-if="soulAwakeningPercent > 0 && soulAwakeningPercent < 100"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="#5a5a5a"
                            :clip-path="`url(#liquidClip-${soulAwakeningPercent})`"
                            class="liquid-surface"
                            opacity="0.3"
                          />
                        </svg>
                        <div class="circular-progress-text">
                          <span class="progress-value">{{ soulAwakeningCurrent }} / {{ soulAwakeningMax }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 下方：五维属性雷达图/表格 -->
              <div class="attributes-radar">
                <button class="radar-title" @click="showRadar = !showRadar">
                  <i :class="showRadar ? 'fas fa-chart-area' : 'fas fa-table'"></i>
                  <span>五维属性</span>
                  <i class="fas fa-exchange-alt toggle-icon"></i>
                </button>
                <canvas v-if="showRadar" ref="radarCanvas" class="radar-canvas"></canvas>
                <div v-else class="attributes-table">
                  <div
                    v-for="attr in attributeRows"
                    :key="attr.key"
                    :class="['table-row', { highlight: attr.highlight }]"
                  >
                    <div class="table-label">
                      <i :class="attr.icon"></i>
                      <span>{{ attr.label }}</span>
                    </div>
                    <div class="table-value">{{ attr.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 标签页1：物品栏 -->
        <div v-if="activeTab === 1" class="tab-panel">
          <div class="inventory-panel">
            <!-- 角色选择按钮区域（顶替标题栏位置） -->
            <div class="character-selector-header">
              <div class="selector-label">
                <i class="fas fa-users"></i>
                <span>选择角色</span>
              </div>
              <div class="character-buttons">
                <button
                  v-for="char in partyCharacters"
                  :key="char"
                  :class="['character-button', { active: selectedCharacter === char }]"
                  @click="selectedCharacter = char"
                >
                  <i class="fas fa-user"></i>
                  <span>{{ char }}</span>
                </button>
              </div>
            </div>

            <!-- 负重和钱包显示 -->
            <div class="weight-wallet-container">
              <!-- 负重显示 -->
              <div class="weight-display">
                <div class="weight-label">
                  <i class="fas fa-weight"></i>
                  <span>负重</span>
                </div>
                <div class="weight-bar-container">
                  <div
                    class="weight-bar-fill"
                    :style="{ width: maxWeight > 0 ? Math.min((currentWeight / maxWeight) * 100, 100) + '%' : '0%' }"
                    :class="{ 'weight-overload': maxWeight > 0 && currentWeight > maxWeight }"
                  ></div>
                </div>
                <div class="weight-value">{{ currentWeight }} / {{ maxWeight }}</div>
              </div>

              <!-- 钱包显示 -->
              <div class="wallet-display">
                <div class="wallet-label">
                  <i class="fas fa-coins"></i>
                  <span>钱包</span>
                </div>
                <div class="wallet-currencies">
                  <div class="currency-item currency-gold">
                    <i class="fas fa-coins"></i>
                    <span class="currency-label">金币</span>
                    <span class="currency-value">{{ formatCurrency(wallet.gold) }}</span>
                  </div>
                  <div class="currency-item currency-silver">
                    <i class="fas fa-coins"></i>
                    <span class="currency-label">银币</span>
                    <span class="currency-value">{{ formatCurrency(wallet.silver) }}</span>
                  </div>
                  <div class="currency-item currency-copper">
                    <i class="fas fa-coins"></i>
                    <span class="currency-label">铜币</span>
                    <span class="currency-value">{{ formatCurrency(wallet.copper) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 物品栏内容：左右布局 -->
            <div class="inventory-layout">
              <!-- 左侧：物品列表 -->
              <div class="inventory-list">
                <div v-if="inventoryItems.length === 0" class="inventory-empty">
                  <i class="fas fa-box-open"></i>
                  <p>物品栏为空</p>
                </div>
                <div v-else class="inventory-items">
                  <div
                    v-for="(item, index) in inventoryItems"
                    :key="index"
                    :class="['inventory-item', { active: selectedItemIndex === index }]"
                    @click="selectedItemIndex = index"
                  >
                    <div class="item-icon" :class="getRarityClass(item.rarity)" :style="getRarityStyle(item.rarity)">
                      <i :class="item.icon || 'fas fa-cube'"></i>
                    </div>
                    <div class="item-info">
                      <div class="item-name">{{ item.name }}</div>
                      <div class="item-meta">
                        <span v-if="item.rarity" class="item-rarity" :class="getRarityClass(item.rarity)">
                          {{ item.rarity }}
                        </span>
                        <span class="item-count">x{{ item.count }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右侧：物品描述 -->
              <div class="inventory-description">
                <div v-if="selectedItemIndex === null || !currentItem" class="description-empty">
                  <i class="fas fa-info-circle"></i>
                  <p>选择一个物品查看详情</p>
                </div>
                <div v-else class="description-content">
                  <div class="description-header">
                    <div
                      class="description-icon"
                      :class="getRarityClass(currentItem.rarity)"
                      :style="getRarityStyle(currentItem.rarity)"
                    >
                      <i :class="currentItem.icon || 'fas fa-cube'"></i>
                    </div>
                    <div class="description-title">
                      <h3>{{ currentItem.name }}</h3>
                      <div class="description-meta">
                        <span
                          v-if="currentItem.rarity"
                          class="description-rarity"
                          :class="getRarityClass(currentItem.rarity)"
                        >
                          {{ currentItem.rarity }}
                        </span>
                        <span class="description-count">数量: x{{ currentItem.count }}</span>
                        <span v-if="currentItem.weight !== undefined" class="description-weight">
                          重量: {{ currentItem.weight }}
                        </span>
                        <span v-if="currentItem.value !== undefined" class="description-value">
                          价值: {{ currentItem.value }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="description-text">
                    <p>{{ currentItem.description || '暂无描述' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 标签页2：装备 -->
        <div v-if="activeTab === 2" class="tab-panel">
          <div class="equipment-panel">
            <!-- 角色选择按钮区域（顶替标题栏位置） -->
            <div class="character-selector-header">
              <div class="selector-label">
                <i class="fas fa-users"></i>
                <span>选择角色</span>
              </div>
              <div class="character-buttons">
                <button
                  v-for="char in partyCharacters"
                  :key="char"
                  :class="['character-button', { active: selectedCharacter === char }]"
                  @click="selectedCharacter = char"
                >
                  <i class="fas fa-user"></i>
                  <span>{{ char }}</span>
                </button>
              </div>
            </div>

            <!-- 可装备点数上限显示 -->
            <div class="equipment-points-display">
              <div class="points-label">
                <i class="fas fa-star"></i>
                <span>可装备点数上限</span>
              </div>
              <div class="points-values">
                <span class="points-current">{{ currentEquipmentPoints }}</span>
                <span class="points-separator">/</span>
                <span class="points-limit">{{ equipmentPointsLimit }}</span>
              </div>
            </div>

            <!-- 装备展示内容：左右布局 -->
            <div class="equipment-content">
              <!-- 左侧：武器/防具 -->
              <div class="equipment-left">
                <!-- 类型切换按钮 -->
                <div class="equipment-type-selector">
                  <button
                    :class="['type-button', { active: equipmentType === 'weapon' }]"
                    @click="equipmentType = 'weapon'"
                  >
                    <i class="fas fa-hammer"></i>
                    <span>武器</span>
                  </button>
                  <button
                    :class="['type-button', { active: equipmentType === 'armor' }]"
                    @click="equipmentType = 'armor'"
                  >
                    <i class="fas fa-shield-halved"></i>
                    <span>防具</span>
                  </button>
                </div>

                <!-- 装备列表 -->
                <div class="equipment-list">
                  <!-- 武器：主手和副手 -->
                  <div v-if="equipmentType === 'weapon'" class="weapon-slots">
                    <div class="weapon-section">
                      <div
                        class="section-title"
                        @click="collapsedSections.weaponMainHand = !collapsedSections.weaponMainHand"
                      >
                        <i class="fas fa-hammer"></i>
                        <span>主手</span>
                        <i
                          :class="['fas', collapsedSections.weaponMainHand ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.weaponMainHand"
                        :class="[
                          'weapon-slot',
                          {
                            active: selectedEquipmentIndex === 0,
                            empty: mainHand === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = mainHand ? 0 : null"
                      >
                        <div
                          v-if="mainHand"
                          class="equipment-icon"
                          :class="getRarityClass(mainHand.rarity)"
                          :style="getRarityStyle(mainHand.rarity)"
                        >
                          <i :class="mainHand.icon || 'fas fa-hammer'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="mainHand" class="equipment-name">{{ mainHand.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                    <div class="weapon-section">
                      <div
                        class="section-title"
                        @click="collapsedSections.weaponOffHand = !collapsedSections.weaponOffHand"
                      >
                        <i class="fas fa-shield-halved"></i>
                        <span>副手</span>
                        <i
                          :class="['fas', collapsedSections.weaponOffHand ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.weaponOffHand"
                        :class="[
                          'weapon-slot',
                          {
                            active: selectedEquipmentIndex === 1,
                            empty: offHand === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = offHand ? 1 : null"
                      >
                        <div
                          v-if="offHand"
                          class="equipment-icon"
                          :class="getRarityClass(offHand.rarity)"
                          :style="getRarityStyle(offHand.rarity)"
                        >
                          <i :class="offHand.icon || 'fas fa-shield-halved'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="offHand" class="equipment-name">{{ offHand.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                  </div>
                  <!-- 防具：6个部位 -->
                  <div v-else class="armor-slots">
                    <div class="armor-section">
                      <div class="section-title" @click="collapsedSections.armorHead = !collapsedSections.armorHead">
                        <i class="fas fa-hat-wizard"></i>
                        <span>头部</span>
                        <i
                          :class="['fas', collapsedSections.armorHead ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.armorHead"
                        :class="[
                          'armor-slot',
                          {
                            active: selectedEquipmentIndex === 2,
                            empty: armorHead === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = armorHead ? 2 : null"
                      >
                        <div
                          v-if="armorHead"
                          class="equipment-icon"
                          :class="getRarityClass(armorHead.rarity)"
                          :style="getRarityStyle(armorHead.rarity)"
                        >
                          <i :class="armorHead.icon || 'fas fa-hat-wizard'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="armorHead" class="equipment-name">{{ armorHead.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                    <div class="armor-section">
                      <div class="section-title" @click="collapsedSections.armorChest = !collapsedSections.armorChest">
                        <i class="fas fa-tshirt"></i>
                        <span>上装</span>
                        <i
                          :class="['fas', collapsedSections.armorChest ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.armorChest"
                        :class="[
                          'armor-slot',
                          {
                            active: selectedEquipmentIndex === 3,
                            empty: armorChest === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = armorChest ? 3 : null"
                      >
                        <div
                          v-if="armorChest"
                          class="equipment-icon"
                          :class="getRarityClass(armorChest.rarity)"
                          :style="getRarityStyle(armorChest.rarity)"
                        >
                          <i :class="armorChest.icon || 'fas fa-tshirt'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="armorChest" class="equipment-name">{{ armorChest.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                    <div class="armor-section">
                      <div class="section-title" @click="collapsedSections.armorBelt = !collapsedSections.armorBelt">
                        <i class="fas fa-belt"></i>
                        <span>腰带</span>
                        <i
                          :class="['fas', collapsedSections.armorBelt ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.armorBelt"
                        :class="[
                          'armor-slot',
                          {
                            active: selectedEquipmentIndex === 4,
                            empty: armorBelt === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = armorBelt ? 4 : null"
                      >
                        <div
                          v-if="armorBelt"
                          class="equipment-icon"
                          :class="getRarityClass(armorBelt.rarity)"
                          :style="getRarityStyle(armorBelt.rarity)"
                        >
                          <i :class="armorBelt.icon || 'fas fa-belt'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="armorBelt" class="equipment-name">{{ armorBelt.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                    <div class="armor-section">
                      <div
                        class="section-title"
                        @click="collapsedSections.armorGloves = !collapsedSections.armorGloves"
                      >
                        <i class="fas fa-hand-paper"></i>
                        <span>手套</span>
                        <i
                          :class="['fas', collapsedSections.armorGloves ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.armorGloves"
                        :class="[
                          'armor-slot',
                          {
                            active: selectedEquipmentIndex === 5,
                            empty: armorGloves === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = armorGloves ? 5 : null"
                      >
                        <div
                          v-if="armorGloves"
                          class="equipment-icon"
                          :class="getRarityClass(armorGloves.rarity)"
                          :style="getRarityStyle(armorGloves.rarity)"
                        >
                          <i :class="armorGloves.icon || 'fas fa-hand-paper'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="armorGloves" class="equipment-name">{{ armorGloves.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                    <div class="armor-section">
                      <div class="section-title" @click="collapsedSections.armorLegs = !collapsedSections.armorLegs">
                        <i class="fas fa-socks"></i>
                        <span>下装</span>
                        <i
                          :class="['fas', collapsedSections.armorLegs ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.armorLegs"
                        :class="[
                          'armor-slot',
                          {
                            active: selectedEquipmentIndex === 6,
                            empty: armorLegs === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = armorLegs ? 6 : null"
                      >
                        <div
                          v-if="armorLegs"
                          class="equipment-icon"
                          :class="getRarityClass(armorLegs.rarity)"
                          :style="getRarityStyle(armorLegs.rarity)"
                        >
                          <i :class="armorLegs.icon || 'fas fa-socks'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="armorLegs" class="equipment-name">{{ armorLegs.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                    <div class="armor-section">
                      <div class="section-title" @click="collapsedSections.armorFeet = !collapsedSections.armorFeet">
                        <i class="fas fa-shoe-prints"></i>
                        <span>鞋部</span>
                        <i
                          :class="['fas', collapsedSections.armorFeet ? 'fa-chevron-down' : 'fa-chevron-up']"
                          class="collapse-icon"
                        ></i>
                      </div>
                      <div
                        v-if="!collapsedSections.armorFeet"
                        :class="[
                          'armor-slot',
                          {
                            active: selectedEquipmentIndex === 7,
                            empty: armorFeet === null,
                          },
                        ]"
                        @click="selectedEquipmentIndex = armorFeet ? 7 : null"
                      >
                        <div
                          v-if="armorFeet"
                          class="equipment-icon"
                          :class="getRarityClass(armorFeet.rarity)"
                          :style="getRarityStyle(armorFeet.rarity)"
                        >
                          <i :class="armorFeet.icon || 'fas fa-shoe-prints'"></i>
                        </div>
                        <div v-else class="equipment-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="armorFeet" class="equipment-name">{{ armorFeet.name }}</div>
                        <div v-else class="equipment-name empty">空位</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 装备描述 -->
                <div class="equipment-description">
                  <div v-if="selectedEquipmentIndex === null || !currentEquipment" class="description-empty">
                    <i class="fas fa-info-circle"></i>
                    <p>选择一个装备查看详情</p>
                  </div>
                  <div v-else class="description-content">
                    <div class="description-header">
                      <div
                        class="description-icon"
                        :class="getRarityClass(currentEquipment.rarity)"
                        :style="getRarityStyle(currentEquipment.rarity)"
                      >
                        <i
                          :class="
                            currentEquipment.icon ||
                            (equipmentType === 'weapon'
                              ? selectedEquipmentIndex === 0
                                ? 'fas fa-hammer'
                                : selectedEquipmentIndex === 1
                                  ? 'fas fa-shield-halved'
                                  : 'fas fa-hammer'
                              : 'fas fa-cube')
                          "
                        ></i>
                      </div>
                      <div class="description-title">
                        <h3>{{ currentEquipment.name }}</h3>
                        <div
                          v-if="currentEquipment.rarity"
                          class="description-rarity"
                          :class="getRarityClass(currentEquipment.rarity)"
                        >
                          {{ currentEquipment.rarity }}
                        </div>
                      </div>
                    </div>
                    <!-- 切换按钮 -->
                    <div class="description-toggle">
                      <button
                        :class="['toggle-button', { active: showEquipmentDescription }]"
                        @click="showEquipmentDescription = true"
                      >
                        <i class="fas fa-align-left"></i>
                        <span>描述</span>
                      </button>
                      <button
                        :class="['toggle-button', { active: !showEquipmentDescription }]"
                        @click="showEquipmentDescription = false"
                      >
                        <i class="fas fa-info-circle"></i>
                        <span>信息</span>
                      </button>
                    </div>
                    <!-- 描述内容 -->
                    <div v-if="showEquipmentDescription" class="description-text">
                      <p v-if="currentEquipment.description">{{ currentEquipment.description }}</p>
                      <p v-else>暂无描述</p>
                    </div>
                    <!-- 装备详细信息 -->
                    <div v-else class="equipment-details">
                      <div v-if="currentEquipment.type" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-tag"></i>
                          类型：
                        </span>
                        <span class="detail-value">{{ currentEquipment.type }}</span>
                      </div>
                      <div
                        v-if="equipmentType === 'weapon' && currentEquipment.weaponPower !== undefined"
                        class="detail-row"
                      >
                        <span class="detail-label">
                          <i class="fas fa-hammer"></i>
                          武器威力：
                        </span>
                        <span class="detail-value">{{ currentEquipment.weaponPower }}</span>
                      </div>
                      <div v-if="currentEquipment.equipmentPoints !== undefined" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-star"></i>
                          装备点数：
                        </span>
                        <span class="detail-value">{{ currentEquipment.equipmentPoints }}</span>
                      </div>
                      <div v-if="currentEquipment.weight !== undefined" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-weight"></i>
                          重量：
                        </span>
                        <span class="detail-value">{{ currentEquipment.weight }}</span>
                      </div>
                      <div v-if="currentEquipment.value !== undefined" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-coins"></i>
                          价值：
                        </span>
                        <span class="detail-value">{{ currentEquipment.value }}</span>
                      </div>
                      <div v-if="currentEquipment.specialEffects" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-magic"></i>
                          特殊效果：
                        </span>
                        <span class="detail-value special-effects">{{ currentEquipment.specialEffects }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右侧：饰品 -->
              <div class="equipment-right">
                <div class="accessories-header">
                  <i class="fas fa-gem"></i>
                  <span>饰品</span>
                </div>
                <div class="accessories-grid">
                  <!-- 4个戒指 -->
                  <div class="accessories-section">
                    <div
                      class="section-title"
                      @click="collapsedSections.accessoryRings = !collapsedSections.accessoryRings"
                    >
                      <i class="fas fa-ring"></i>
                      <span>戒指</span>
                      <i
                        :class="['fas', collapsedSections.accessoryRings ? 'fa-chevron-down' : 'fa-chevron-up']"
                        class="collapse-icon"
                      ></i>
                    </div>
                    <div v-if="!collapsedSections.accessoryRings" class="rings-grid">
                      <div
                        v-for="(ring, index) in rings"
                        :key="index"
                        :class="[
                          'accessory-slot',
                          {
                            active: selectedAccessoryType === 'ring' && selectedAccessoryIndex === index,
                            empty: ring === null,
                          },
                        ]"
                        @click="
                          selectedAccessoryType = 'ring';
                          selectedAccessoryIndex = index;
                        "
                      >
                        <div
                          v-if="ring"
                          class="accessory-icon"
                          :class="getRarityClass(ring.rarity)"
                          :style="getRarityStyle(ring.rarity)"
                        >
                          <i :class="ring.icon || 'fas fa-ring'"></i>
                        </div>
                        <div v-else class="accessory-icon empty-slot">
                          <i class="fas fa-plus"></i>
                        </div>
                        <div v-if="ring" class="accessory-name">{{ ring.name }}</div>
                        <div v-else class="accessory-name empty">空位</div>
                      </div>
                    </div>
                  </div>

                  <!-- 项链 -->
                  <div class="accessories-section">
                    <div
                      class="section-title"
                      @click="collapsedSections.accessoryNecklace = !collapsedSections.accessoryNecklace"
                    >
                      <i class="fas fa-gem"></i>
                      <span>项链</span>
                      <i
                        :class="['fas', collapsedSections.accessoryNecklace ? 'fa-chevron-down' : 'fa-chevron-up']"
                        class="collapse-icon"
                      ></i>
                    </div>
                    <div
                      v-if="!collapsedSections.accessoryNecklace"
                      :class="[
                        'accessory-slot',
                        {
                          active: selectedAccessoryType === 'necklace',
                          empty: necklace === null,
                        },
                      ]"
                      @click="
                        selectedAccessoryType = 'necklace';
                        selectedAccessoryIndex = 0;
                      "
                    >
                      <div
                        v-if="necklace"
                        class="accessory-icon"
                        :class="getRarityClass(necklace.rarity)"
                        :style="getRarityStyle(necklace.rarity)"
                      >
                        <i :class="necklace.icon || 'fas fa-gem'"></i>
                      </div>
                      <div v-else class="accessory-icon empty-slot">
                        <i class="fas fa-plus"></i>
                      </div>
                      <div v-if="necklace" class="accessory-name">{{ necklace.name }}</div>
                      <div v-else class="accessory-name empty">空位</div>
                    </div>
                  </div>

                  <!-- 耳环 -->
                  <div class="accessories-section">
                    <div
                      class="section-title"
                      @click="collapsedSections.accessoryEarring = !collapsedSections.accessoryEarring"
                    >
                      <i class="fas fa-circle"></i>
                      <span>耳环</span>
                      <i
                        :class="['fas', collapsedSections.accessoryEarring ? 'fa-chevron-down' : 'fa-chevron-up']"
                        class="collapse-icon"
                      ></i>
                    </div>
                    <div
                      v-if="!collapsedSections.accessoryEarring"
                      :class="[
                        'accessory-slot',
                        {
                          active: selectedAccessoryType === 'earring',
                          empty: earring === null,
                        },
                      ]"
                      @click="
                        selectedAccessoryType = 'earring';
                        selectedAccessoryIndex = 0;
                      "
                    >
                      <div
                        v-if="earring"
                        class="accessory-icon"
                        :class="getRarityClass(earring.rarity)"
                        :style="getRarityStyle(earring.rarity)"
                      >
                        <i :class="earring.icon || 'fas fa-circle'"></i>
                      </div>
                      <div v-else class="accessory-icon empty-slot">
                        <i class="fas fa-plus"></i>
                      </div>
                      <div v-if="earring" class="accessory-name">{{ earring.name }}</div>
                      <div v-else class="accessory-name empty">空位</div>
                    </div>
                  </div>
                </div>

                <!-- 饰品描述 -->
                <div class="accessories-description">
                  <div v-if="selectedAccessoryIndex === null || !currentAccessory" class="description-empty">
                    <i class="fas fa-info-circle"></i>
                    <p>选择一个饰品查看详情</p>
                  </div>
                  <div v-else class="description-content">
                    <div class="description-header">
                      <div
                        class="description-icon"
                        :class="getRarityClass(currentAccessory.rarity)"
                        :style="getRarityStyle(currentAccessory.rarity)"
                      >
                        <i
                          :class="
                            currentAccessory.icon ||
                            (selectedAccessoryType === 'ring'
                              ? 'fas fa-ring'
                              : selectedAccessoryType === 'necklace'
                                ? 'fas fa-gem'
                                : selectedAccessoryType === 'earring'
                                  ? 'fas fa-circle'
                                  : 'fas fa-cube')
                          "
                        ></i>
                      </div>
                      <div class="description-title">
                        <h3>{{ currentAccessory.name }}</h3>
                        <div
                          v-if="currentAccessory.rarity"
                          class="description-rarity"
                          :class="getRarityClass(currentAccessory.rarity)"
                        >
                          {{ currentAccessory.rarity }}
                        </div>
                      </div>
                    </div>
                    <!-- 切换按钮 -->
                    <div class="description-toggle">
                      <button
                        :class="['toggle-button', { active: showAccessoryDescription }]"
                        @click="showAccessoryDescription = true"
                      >
                        <i class="fas fa-align-left"></i>
                        <span>描述</span>
                      </button>
                      <button
                        :class="['toggle-button', { active: !showAccessoryDescription }]"
                        @click="showAccessoryDescription = false"
                      >
                        <i class="fas fa-info-circle"></i>
                        <span>信息</span>
                      </button>
                    </div>
                    <!-- 描述内容 -->
                    <div v-if="showAccessoryDescription" class="description-text">
                      <p>{{ currentAccessory.description || '暂无描述' }}</p>
                    </div>
                    <!-- 饰品详细信息 -->
                    <div v-else class="equipment-details">
                      <div v-if="currentAccessory.type" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-tag"></i>
                          类型：
                        </span>
                        <span class="detail-value">{{ currentAccessory.type }}</span>
                      </div>
                      <div v-if="currentAccessory.equipmentPoints !== undefined" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-star"></i>
                          装备点数：
                        </span>
                        <span class="detail-value">{{ currentAccessory.equipmentPoints }}</span>
                      </div>
                      <div v-if="currentAccessory.weight !== undefined" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-weight"></i>
                          重量：
                        </span>
                        <span class="detail-value">{{ currentAccessory.weight }}</span>
                      </div>
                      <div v-if="currentAccessory.value !== undefined" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-coins"></i>
                          价值：
                        </span>
                        <span class="detail-value">{{ currentAccessory.value }}</span>
                      </div>
                      <div v-if="currentAccessory.specialEffects" class="detail-row">
                        <span class="detail-label">
                          <i class="fas fa-magic"></i>
                          特殊效果：
                        </span>
                        <span class="detail-value special-effects">{{ currentAccessory.specialEffects }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 标签页3：技能 -->
        <div v-if="activeTab === 3" class="tab-panel">
          <div class="skills-panel">
            <!-- 角色选择按钮区域 -->
            <div class="character-selector-header">
              <div class="selector-label">
                <i class="fas fa-users"></i>
                <span>选择角色</span>
              </div>
              <div class="character-buttons">
                <button
                  v-for="char in partyCharacters"
                  :key="char"
                  :class="['character-button', { active: selectedCharacter === char }]"
                  @click="selectedCharacter = char"
                >
                  <i class="fas fa-user"></i>
                  <span>{{ char }}</span>
                </button>
              </div>
            </div>

            <!-- 技能内容区域 -->
            <div class="skills-content">
              <!-- 技能内容：左右布局 -->
              <div class="skills-layout">
                <!-- 左侧：技能列表 -->
                <div class="skills-list">
                  <!-- 技能类型切换标签 -->
                  <div class="skill-type-tabs">
                    <button
                      :class="['skill-type-tab', { active: selectedSkillType === 'active' }]"
                      @click="
                        selectedSkillType = 'active';
                        selectedSkillIndex = null;
                      "
                    >
                      <i class="fas fa-bolt"></i>
                      <span>主动技能</span>
                      <span v-if="activeSkills.length > 0" class="tab-count">({{ activeSkills.length }})</span>
                    </button>
                    <button
                      :class="['skill-type-tab', { active: selectedSkillType === 'passive' }]"
                      @click="
                        selectedSkillType = 'passive';
                        selectedSkillIndex = null;
                      "
                    >
                      <i class="fas fa-shield-alt"></i>
                      <span>被动技能</span>
                      <span v-if="passiveSkills.length > 0" class="tab-count">({{ passiveSkills.length }})</span>
                    </button>
                  </div>

                  <div class="skills-list-content">
                    <div v-if="displayedSkills.length === 0" class="skills-empty">
                      <i class="fas fa-scroll"></i>
                      <p>{{ selectedSkillType === 'active' ? '暂无主动技能' : '暂无被动技能' }}</p>
                    </div>
                    <div v-else class="skills-items">
                      <div
                        v-for="(skill, index) in displayedSkills"
                        :key="index"
                        :class="['skill-item', { active: selectedSkillIndex === index }]"
                        @click="selectedSkillIndex = index"
                      >
                        <div class="skill-info">
                          <div class="skill-name">{{ skill.name }}</div>
                          <div class="skill-meta">
                            <span v-if="skill.rarity" class="skill-rarity" :class="getRarityClass(skill.rarity)">
                              {{ skill.rarity }}
                            </span>
                            <span v-if="skill.level !== undefined" class="skill-level"> 等级: {{ skill.level }} </span>
                            <span v-if="skill.type" class="skill-type">
                              {{ skill.type }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 右侧：技能描述 -->
                <div class="skills-description">
                  <div v-if="selectedSkillIndex === null || !currentSkill" class="description-empty">
                    <i class="fas fa-info-circle"></i>
                    <p>选择一个技能查看详情</p>
                  </div>
                  <div v-else class="description-content">
                    <div class="description-header">
                      <div
                        class="description-icon"
                        :class="getRarityClass(currentSkill.rarity)"
                        :style="getRarityStyle(currentSkill.rarity)"
                      >
                        <i :class="currentSkill.icon || 'fas fa-magic'"></i>
                      </div>
                      <div class="description-title">
                        <h3>{{ currentSkill.name }}</h3>
                        <div class="description-meta">
                          <span
                            v-if="currentSkill.rarity"
                            class="description-rarity"
                            :class="getRarityClass(currentSkill.rarity)"
                          >
                            {{ currentSkill.rarity }}
                          </span>
                          <span v-if="currentSkill.type" class="description-type">
                            {{ currentSkill.type }}
                          </span>
                          <span v-if="currentSkill.level !== undefined" class="description-level">
                            等级: {{ currentSkill.level }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-if="currentSkill.cost !== undefined && currentSkill.cost !== null" class="description-cost">
                      <div class="cost-label">
                        <i class="fas fa-bolt"></i>
                        <span>消耗</span>
                      </div>
                      <div class="cost-value">
                        {{ formatCost(currentSkill.cost) }}
                      </div>
                    </div>
                    <div class="description-text">
                      <p>{{ currentSkill.description || '暂无描述' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 标签页4：任务书 -->
        <div v-if="activeTab === 4" class="tab-panel">
          <div class="quest-panel">
            <!-- 任务类型切换按钮 -->
            <div class="quest-type-tabs">
              <button
                :class="['quest-type-tab', { active: selectedQuestType === 'main' }]"
                @click="
                  selectedQuestType = 'main';
                  selectedQuestIndex = null;
                "
              >
                <i class="fas fa-crown"></i>
                <span>主线任务</span>
                <span v-if="mainQuests.length > 0" class="tab-count">({{ mainQuests.length }})</span>
              </button>
              <button
                :class="['quest-type-tab', { active: selectedQuestType === 'side' }]"
                @click="
                  selectedQuestType = 'side';
                  selectedQuestIndex = null;
                "
              >
                <i class="fas fa-star"></i>
                <span>支线任务</span>
                <span v-if="sideQuests.length > 0" class="tab-count">({{ sideQuests.length }})</span>
              </button>
            </div>

            <!-- 上方：任务列表 -->
            <div class="quest-list-container">
              <div v-if="displayedQuests.length === 0" class="quest-empty">
                <i class="fas fa-book"></i>
                <p>{{ selectedQuestType === 'main' ? '暂无主线任务' : '暂无支线任务' }}</p>
              </div>
              <div v-else class="quest-list">
                <div
                  v-for="(quest, index) in displayedQuests"
                  :key="index"
                  :class="['quest-item', { active: selectedQuestIndex === index }]"
                  @click="selectedQuestIndex = index"
                >
                  <div class="quest-info">
                    <div class="quest-name">{{ quest.name }}</div>
                    <div class="quest-meta">
                      <span v-if="quest.status" class="quest-status" :class="getQuestStatusClass(quest.status)">
                        {{ quest.status }}
                      </span>
                      <span v-if="quest.type" class="quest-type">
                        {{ quest.type }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 下方：任务详情 -->
            <div class="quest-description">
              <div v-if="selectedQuestIndex === null || !currentQuest" class="description-empty">
                <i class="fas fa-info-circle"></i>
                <p>选择一个任务查看详情</p>
              </div>
              <div v-else class="description-content">
                <div class="description-header">
                  <div class="description-title">
                    <h3>{{ currentQuest.name }}</h3>
                    <div class="description-meta">
                      <span
                        v-if="currentQuest.status"
                        class="description-status"
                        :class="getQuestStatusClass(currentQuest.status)"
                      >
                        {{ currentQuest.status }}
                      </span>
                      <span v-if="currentQuest.type" class="description-type">
                        {{ currentQuest.type }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="description-body">
                  <div v-if="currentQuest.description" class="description-text">
                    <h4>任务描述</h4>
                    <p>{{ currentQuest.description }}</p>
                  </div>
                  <div
                    v-if="currentQuest.objectives && currentQuest.objectives.length > 0"
                    class="description-objectives"
                  >
                    <h4>任务目标</h4>
                    <ul>
                      <li v-for="(objective, idx) in currentQuest.objectives" :key="idx">
                        {{ objective }}
                      </li>
                    </ul>
                  </div>
                  <div v-if="currentQuest.rewards && currentQuest.rewards.length > 0" class="description-rewards">
                    <h4>任务奖励</h4>
                    <ul>
                      <li v-for="(reward, idx) in currentQuest.rewards" :key="idx">
                        {{ reward }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

// ==================== 常量配置 ====================
const TABS = [
  { name: '主要信息', icon: 'fas fa-user-circle' },
  { name: '物品栏', icon: 'fas fa-box' },
  { name: '装备', icon: 'fas fa-shield-alt' },
  { name: '技能', icon: 'fas fa-scroll' },
  { name: '任务书', icon: 'fas fa-book' },
] as const;

const ATTRIBUTE_CONFIG = [
  { key: 'strength', label: '力量', icon: 'fas fa-fist-raised' },
  { key: 'agility', label: '敏捷', icon: 'fas fa-running' },
  { key: 'constitution', label: '体质', icon: 'fas fa-shield-alt' },
  { key: 'intelligence', label: '智力', icon: 'fas fa-brain' },
  { key: 'spirit', label: '精神', icon: 'fas fa-magic' },
] as const;

// ==================== 响应式数据 ====================
// 健康状态数据
const hpCurrent = ref(85);
const hpMax = ref(120);
const mpCurrent = ref(45);
const mpMax = ref(80);
const sanityCurrent = ref(60);
const sanityMax = ref(100);
const expCurrent = ref(0);
const expMax = ref(100);

// 角色信息
const characterName = ref('');
const characterLevel = ref('');
const characterLifeTier = ref('');
const characterRace = ref('');
const characterAge = ref('');
const characterIdentity = ref('');
const mentalState = ref('');

// 属性数据
const strength = ref(0);
const agility = ref(0);
const constitution = ref(0);
const intelligence = ref(0);
const spirit = ref(0);
const availablePoints = ref(0);

// 灵魂觉醒度
const soulAwakeningCurrent = ref(0);
const soulAwakeningMax = ref(100);

// UI 状态
const radarCanvas = ref<HTMLCanvasElement | null>(null);
const showRadar = ref(true);
const activeTab = ref(0);

// 物品栏相关状态
const selectedCharacter = ref('主角'); // 当前选中的角色
const partyCharacters = ref<string[]>(['主角']); // 角色列表（主角 + 同伴）
const inventoryItems = ref<
  Array<{
    name: string;
    count: number;
    icon?: string;
    description?: string;
    rarity?: string;
    weight?: number;
    value?: number;
  }>
>([]); // 当前角色的物品列表
const selectedItemIndex = ref<number | null>(null); // 当前选中的物品索引
const currentWeight = ref(0); // 当前负重
const wallet = ref<{
  gold: number; // 金币
  silver: number; // 银币
  copper: number; // 铜币
}>({
  gold: 0,
  silver: 0,
  copper: 0,
}); // 钱包（包含金币、银币、铜币）

// 技能相关数据
const skillsItems = ref<
  Array<{
    name: string;
    level?: number;
    icon?: string;
    description?: string;
    type?: string;
    isActive?: boolean;
    rarity?: string;
    cost?: unknown;
  }>
>([]); // 当前角色的技能列表
const selectedSkillIndex = ref<number | null>(null); // 当前选中的技能索引
const selectedSkillType = ref<'active' | 'passive'>('active'); // 当前选中的技能类型（主动/被动）

// 主动技能和被动技能
const activeSkills = computed(() => {
  return skillsItems.value.filter(skill => skill.isActive !== false); // 默认是主动技能，除非明确标记为被动
});

const passiveSkills = computed(() => {
  return skillsItems.value.filter(skill => skill.isActive === false);
});

// 当前显示的技能列表
const displayedSkills = computed(() => {
  return selectedSkillType.value === 'active' ? activeSkills.value : passiveSkills.value;
});

// 任务相关数据
const questItems = ref<
  Array<{
    name: string;
    status?: string;
    type?: string;
    questType?: '主线' | '支线' | 'main' | 'side' | '主线任务' | '支线任务';
    description?: string;
    objectives?: string[];
    rewards?: string[];
  }>
>([]); // 任务列表
const selectedQuestIndex = ref<number | null>(null); // 当前选中的任务索引
const selectedQuestType = ref<'main' | 'side'>('main'); // 当前选中的任务类型（主线/支线）

// 主线任务和支线任务
const mainQuests = computed(() => {
  return questItems.value.filter(quest => {
    const questType = quest.questType || quest.type;
    return questType === '主线' || questType === 'main' || questType === '主线任务';
  });
});

const sideQuests = computed(() => {
  return questItems.value.filter(quest => {
    const questType = quest.questType || quest.type;
    return questType === '支线' || questType === 'side' || questType === '支线任务';
  });
});

// 当前显示的任务列表
const displayedQuests = computed(() => {
  return selectedQuestType.value === 'main' ? mainQuests.value : sideQuests.value;
});
const maxWeight = ref(0); // 最大负重

// 装备相关状态
const equipmentType = ref<'weapon' | 'armor'>('weapon'); // 当前显示的装备类型：武器或防具
const equipmentItems = ref<
  Array<{
    name: string;
    icon?: string;
    description?: string;
    rarity?: string;
    type?: string;
    weaponPower?: number;
    equipmentPoints?: number;
    specialEffects?: string;
    weight?: number;
    value?: number;
  }>
>([]); // 防具列表（已废弃，保留用于兼容）
const selectedEquipmentIndex = ref<number | null>(null); // 当前选中的装备索引（武器：0=主手，1=副手；防具：2=头部，3=上装，4=腰带，5=手套，6=下装，7=鞋部）
// 防具：6个部位
const armorHead = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 头部
const armorChest = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 上装
const armorBelt = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 腰带
const armorGloves = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 手套
const armorLegs = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 下装
const armorFeet = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 鞋部
// 武器：主手和副手两个槽位
const mainHand = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  weaponPower?: number;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 主手武器
const offHand = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  weaponPower?: number;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 副手武器
// 饰品：4个戒指、1个项链、1个耳环
const rings = ref<
  Array<{
    name: string;
    icon?: string;
    description?: string;
    rarity?: string;
    type?: string;
    equipmentPoints?: number;
    specialEffects?: string;
    weight?: number;
    value?: number;
  } | null>
>([null, null, null, null]); // 4个戒指
const necklace = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 项链
const earring = ref<{
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null>(null); // 耳环
const selectedAccessoryType = ref<'ring' | 'necklace' | 'earring' | null>(null); // 当前选中的饰品类型
const selectedAccessoryIndex = ref<number | null>(null); // 当前选中的饰品索引（如果是戒指，则为戒指索引0-3）
// 描述/信息切换状态
const showEquipmentDescription = ref(true); // true=显示描述，false=显示具体信息
const showAccessoryDescription = ref(true); // true=显示描述，false=显示具体信息
// 可装备点数上限
const equipmentPointsLimit = ref<number>(0);
// 折叠状态（默认全部折叠）
const collapsedSections = ref<Record<string, boolean>>({
  characterInfo: true, // 角色信息（移动端默认折叠）
  statusBars: false, // 状态条（移动端默认展开）
  weaponMainHand: true, // 主手
  weaponOffHand: true, // 副手
  armorHead: true, // 头部
  armorChest: true, // 上装
  armorBelt: true, // 腰带
  armorGloves: true, // 手套
  armorLegs: true, // 下装
  armorFeet: true, // 鞋部
  accessoryRings: true, // 戒指
  accessoryNecklace: true, // 项链
  accessoryEarring: true, // 耳环
});

// 当前选中的物品
const currentItem = computed(() => {
  if (
    selectedItemIndex.value === null ||
    selectedItemIndex.value < 0 ||
    selectedItemIndex.value >= inventoryItems.value.length
  ) {
    return null;
  }
  return inventoryItems.value[selectedItemIndex.value];
});

// 当前选中的技能
const currentSkill = computed(() => {
  if (
    selectedSkillIndex.value === null ||
    selectedSkillIndex.value < 0 ||
    selectedSkillIndex.value >= displayedSkills.value.length
  ) {
    return null;
  }
  return displayedSkills.value[selectedSkillIndex.value];
});

// 当前选中的任务
const currentQuest = computed(() => {
  if (
    selectedQuestIndex.value === null ||
    selectedQuestIndex.value < 0 ||
    selectedQuestIndex.value >= questItems.value.length
  ) {
    return null;
  }
  return questItems.value[selectedQuestIndex.value];
});

// 当前选中的装备
const currentEquipment = computed(() => {
  if (selectedEquipmentIndex.value === null) {
    return null;
  }

  if (equipmentType.value === 'weapon') {
    // 武器：0=主手，1=副手
    if (selectedEquipmentIndex.value === 0) {
      return mainHand.value;
    } else if (selectedEquipmentIndex.value === 1) {
      return offHand.value;
    }
    return null;
  } else {
    // 防具：2=头部，3=上装，4=腰带，5=手套，6=下装，7=鞋部
    if (selectedEquipmentIndex.value === 2) {
      return armorHead.value;
    } else if (selectedEquipmentIndex.value === 3) {
      return armorChest.value;
    } else if (selectedEquipmentIndex.value === 4) {
      return armorBelt.value;
    } else if (selectedEquipmentIndex.value === 5) {
      return armorGloves.value;
    } else if (selectedEquipmentIndex.value === 6) {
      return armorLegs.value;
    } else if (selectedEquipmentIndex.value === 7) {
      return armorFeet.value;
    }
    return null;
  }
});

// 当前选中的饰品
const currentAccessory = computed(() => {
  if (selectedAccessoryType.value === null || selectedAccessoryIndex.value === null) {
    return null;
  }

  if (selectedAccessoryType.value === 'ring') {
    if (selectedAccessoryIndex.value < 0 || selectedAccessoryIndex.value >= rings.value.length) {
      return null;
    }
    return rings.value[selectedAccessoryIndex.value];
  } else if (selectedAccessoryType.value === 'necklace') {
    return necklace.value;
  } else if (selectedAccessoryType.value === 'earring') {
    return earring.value;
  }

  return null;
});

// 当前装备点数总和
const currentEquipmentPoints = computed(() => {
  let total = 0;

  // 武器
  if (mainHand.value?.equipmentPoints !== undefined) {
    total += mainHand.value.equipmentPoints;
  }
  if (offHand.value?.equipmentPoints !== undefined) {
    total += offHand.value.equipmentPoints;
  }

  // 防具
  if (armorHead.value?.equipmentPoints !== undefined) {
    total += armorHead.value.equipmentPoints;
  }
  if (armorChest.value?.equipmentPoints !== undefined) {
    total += armorChest.value.equipmentPoints;
  }
  if (armorBelt.value?.equipmentPoints !== undefined) {
    total += armorBelt.value.equipmentPoints;
  }
  if (armorGloves.value?.equipmentPoints !== undefined) {
    total += armorGloves.value.equipmentPoints;
  }
  if (armorLegs.value?.equipmentPoints !== undefined) {
    total += armorLegs.value.equipmentPoints;
  }
  if (armorFeet.value?.equipmentPoints !== undefined) {
    total += armorFeet.value.equipmentPoints;
  }

  // 饰品
  rings.value.forEach(ring => {
    if (ring?.equipmentPoints !== undefined) {
      total += ring.equipmentPoints;
    }
  });
  if (necklace.value?.equipmentPoints !== undefined) {
    total += necklace.value.equipmentPoints;
  }
  if (earring.value?.equipmentPoints !== undefined) {
    total += earring.value.equipmentPoints;
  }

  return total;
});

// ==================== 工具函数 ====================
/**
 * 计算百分比（0-100）
 */
function calculatePercent(current: number, max: number): number {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (current / max) * 100));
}

/**
 * 格式化货币显示（添加千位分隔符）
 */
function formatCurrency(value: number): string {
  if (typeof value === 'number') {
    return value.toLocaleString('zh-CN');
  }
  return '0';
}

/**
 * 根据稀有度获取CSS类名
 */
function getRarityClass(rarity?: string): string {
  if (!rarity) return 'rarity-common';
  const rarityMap: Record<string, string> = {
    凡品: 'rarity-common',
    良制: 'rarity-uncommon',
    精工: 'rarity-rare',
    史诗: 'rarity-epic',
    传说: 'rarity-legendary',
    孤遗: 'rarity-unique',
    神话: 'rarity-mythic',
  };
  return rarityMap[rarity] || 'rarity-common';
}

/**
 * 根据稀有度获取内联样式（用于渐变）
 */
function getRarityStyle(rarity?: string): Record<string, string> {
  if (rarity === '神话') {
    return {
      background: 'linear-gradient(135deg, #FF0000, #FFD700)',
    };
  }
  return {};
}

/**
 * 根据任务状态获取CSS类名
 */
function getQuestStatusClass(status?: string): string {
  if (!status) return 'quest-status-default';
  const statusMap: Record<string, string> = {
    进行中: 'quest-status-active',
    已完成: 'quest-status-completed',
    已失败: 'quest-status-failed',
    已放弃: 'quest-status-abandoned',
    未接取: 'quest-status-available',
  };
  return statusMap[status] || 'quest-status-default';
}

/**
 * 格式化技能消耗显示
 */
function formatCost(cost: unknown): string {
  if (cost === null || cost === undefined) {
    return '无';
  }

  if (typeof cost === 'string') {
    return cost;
  }

  if (typeof cost === 'number') {
    return String(cost);
  }

  if (typeof cost === 'object') {
    const costObj = cost as Record<string, unknown>;
    const parts: string[] = [];

    // 处理常见的消耗字段
    if (costObj.法力值 !== undefined || costObj.mp !== undefined) {
      const mp = costObj.法力值 || costObj.mp;
      parts.push(`法力值: ${mp}`);
    }
    if (costObj.生命值 !== undefined || costObj.hp !== undefined) {
      const hp = costObj.生命值 || costObj.hp;
      parts.push(`生命值: ${hp}`);
    }
    if (costObj.理智值 !== undefined || costObj.sanity !== undefined) {
      const sanity = costObj.理智值 || costObj.sanity;
      parts.push(`理智值: ${sanity}`);
    }
    if (costObj.体力 !== undefined || costObj.stamina !== undefined) {
      const stamina = costObj.体力 || costObj.stamina;
      parts.push(`体力: ${stamina}`);
    }

    // 如果有其他字段，也尝试显示
    if (parts.length === 0) {
      Object.keys(costObj).forEach(key => {
        const value = costObj[key];
        if (value !== null && value !== undefined) {
          parts.push(`${key}: ${value}`);
        }
      });
    }

    return parts.length > 0 ? parts.join(', ') : JSON.stringify(cost);
  }

  return String(cost);
}

/**
 * 从对象中提取当前值（支持多种格式）
 */
function extractCurrentValue(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    if (typeof obj.当前 === 'number') return obj.当前;
    if (typeof obj.当前值 === 'number') return obj.当前值;
  }
  return null;
}

/**
 * 从对象中提取最大值（支持多种格式）
 */
function extractMaxValue(value: unknown): number | null {
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    if (typeof obj.最大 === 'number') return obj.最大;
    if (typeof obj.最大值 === 'number') return obj.最大值;
  }
  return null;
}

/**
 * 安全读取变量值
 */
function getVariableValue(variables: unknown, path: string): unknown {
  return _.get(variables, path);
}

/**
 * 判断是否是主角
 */
function isProtagonistCharacter(characterName: string, protagonistName: unknown): boolean {
  return characterName === '主角' || (typeof protagonistName === 'string' && characterName === protagonistName);
}

/**
 * 获取角色数据路径前缀
 */
function getCharacterDataPrefix(characterName: string, protagonistName: unknown): string {
  return isProtagonistCharacter(characterName, protagonistName) ? 'stat_data.主角' : `stat_data.同伴.${characterName}`;
}

/**
 * 解析单个技能对象
 */
function parseSingleSkill(
  skillObj: Record<string, unknown>,
  defaultName: string,
  isActive: boolean,
  getSkillCostFn?: (skillName: string, isActive: boolean) => unknown,
): {
  name: string;
  level?: number;
  icon?: string;
  description?: string;
  type?: string;
  isActive?: boolean;
  rarity?: string;
  cost?: unknown;
} {
  const skillName = String(skillObj.名称 || skillObj.name || defaultName);
  return {
    name: skillName,
    level:
      typeof skillObj.等级 === 'number'
        ? skillObj.等级
        : typeof skillObj.level === 'number'
          ? skillObj.level
          : undefined,
    icon:
      typeof skillObj.图标 === 'string' ? skillObj.图标 : typeof skillObj.icon === 'string' ? skillObj.icon : undefined,
    description:
      typeof skillObj.描述 === 'string'
        ? skillObj.描述
        : typeof skillObj.description === 'string'
          ? skillObj.description
          : undefined,
    type:
      typeof skillObj.类型 === 'string' ? skillObj.类型 : typeof skillObj.type === 'string' ? skillObj.type : undefined,
    rarity:
      typeof skillObj.稀有度 === 'string'
        ? skillObj.稀有度
        : typeof skillObj.rarity === 'string'
          ? skillObj.rarity
          : undefined,
    cost:
      typeof skillObj.消耗 !== 'undefined'
        ? skillObj.消耗
        : getSkillCostFn
          ? getSkillCostFn(skillName, isActive)
          : undefined,
    isActive: isActive,
  };
}

// ==================== 计算属性 ====================
const tabs = TABS;

// 状态条配置（响应式）
const statusBars = computed(() => [
  {
    key: 'hp',
    label: '生命值',
    icon: 'fas fa-heart',
    class: 'hp',
    current: hpCurrent.value,
    max: hpMax.value,
    percent: calculatePercent(hpCurrent.value, hpMax.value),
  },
  {
    key: 'mp',
    label: '法力值',
    icon: 'fas fa-gem',
    class: 'mp',
    current: mpCurrent.value,
    max: mpMax.value,
    percent: calculatePercent(mpCurrent.value, mpMax.value),
  },
  {
    key: 'sanity',
    label: '理智值',
    icon: 'fas fa-brain',
    class: 'sanity',
    current: sanityCurrent.value,
    max: sanityMax.value,
    percent: calculatePercent(sanityCurrent.value, sanityMax.value),
  },
  {
    key: 'exp',
    label: '经验值',
    icon: 'fas fa-star',
    class: 'exp',
    current: expCurrent.value,
    max: expMax.value,
    percent: calculatePercent(expCurrent.value, expMax.value),
  },
]);

// 属性表格行配置（响应式）
const attributeRows = computed(() => [
  ...ATTRIBUTE_CONFIG.map(attr => ({
    key: attr.key,
    label: attr.label,
    icon: attr.icon,
    value: {
      strength: strength.value,
      agility: agility.value,
      constitution: constitution.value,
      intelligence: intelligence.value,
      spirit: spirit.value,
    }[attr.key],
    highlight: false,
  })),
  {
    key: 'availablePoints',
    label: '可用属性点',
    icon: 'fas fa-star',
    value: availablePoints.value,
    highlight: true,
  },
]);

// 灵魂觉醒度百分比
const soulAwakeningPercent = computed(() => calculatePercent(soulAwakeningCurrent.value, soulAwakeningMax.value));

// ==================== 数据更新函数 ====================
/**
 * 从酒馆变量读取健康状态数据
 */
function updateHealthData() {
  if (typeof getCurrentMessageId !== 'function' || typeof getVariables !== 'function') {
    console.info('不在酒馆环境中，使用默认健康状态数据');
    return;
  }

  try {
    const message_id = getCurrentMessageId();
    const variables = getVariables({ type: 'message', message_id });

    // 获取主角名称，用于判断是否是主角
    const protagonistName = getVariableValue(variables, 'stat_data.主角.名称');
    const isProtagonist = isProtagonistCharacter(selectedCharacter.value, protagonistName);

    // 根据选中的角色构建数据路径前缀
    const dataPrefix = getCharacterDataPrefix(selectedCharacter.value, protagonistName);

    // 读取生命值
    const hpValue = getVariableValue(variables, `${dataPrefix}.健康状态.生命值`);
    const hpCurrentVal = extractCurrentValue(hpValue);
    if (hpCurrentVal !== null) hpCurrent.value = hpCurrentVal;
    const hpMaxVal = getVariableValue(variables, `${dataPrefix}.健康状态.生命值上限`);
    if (typeof hpMaxVal === 'number') hpMax.value = hpMaxVal;

    // 读取法力值
    const mpValue = getVariableValue(variables, `${dataPrefix}.健康状态.法力值`);
    const mpCurrentVal = extractCurrentValue(mpValue);
    if (mpCurrentVal !== null) mpCurrent.value = mpCurrentVal;
    const mpMaxVal = getVariableValue(variables, `${dataPrefix}.健康状态.法力值上限`);
    if (typeof mpMaxVal === 'number') mpMax.value = mpMaxVal;

    // 读取理智值
    const sanityValue = getVariableValue(variables, `${dataPrefix}.健康状态.理智值`);
    const sanityCurrentVal = extractCurrentValue(sanityValue);
    if (sanityCurrentVal !== null) sanityCurrent.value = sanityCurrentVal;
    const sanityMaxVal = getVariableValue(variables, `${dataPrefix}.健康状态.理智值上限`);
    if (typeof sanityMaxVal === 'number') sanityMax.value = sanityMaxVal;

    // 读取经验值
    const expValue = getVariableValue(variables, `${dataPrefix}.当前经验值`);
    if (typeof expValue === 'number') expCurrent.value = expValue;
    const expMaxVal = getVariableValue(variables, `${dataPrefix}.升级所需经验值`);
    if (typeof expMaxVal === 'number') expMax.value = expMaxVal;

    // 读取角色信息
    const name = getVariableValue(variables, `${dataPrefix}.名称`);
    if (typeof name === 'string') characterName.value = name;

    const level = getVariableValue(variables, `${dataPrefix}.等级`);
    if (level !== undefined && level !== null) characterLevel.value = String(level);

    const lifeTier = getVariableValue(variables, `${dataPrefix}.生命阶层`);
    if (lifeTier !== undefined && lifeTier !== null) characterLifeTier.value = String(lifeTier);

    const race = getVariableValue(variables, `${dataPrefix}.种族`);
    if (typeof race === 'string') characterRace.value = race;

    const age = getVariableValue(variables, `${dataPrefix}.年龄`);
    if (age !== undefined && age !== null) characterAge.value = String(age);

    const identity = getVariableValue(variables, `${dataPrefix}.身份`);
    if (typeof identity === 'string') characterIdentity.value = identity;

    const mental = getVariableValue(variables, `${dataPrefix}.健康状态.精神状态`);
    if (typeof mental === 'string') mentalState.value = mental;

    // 读取五维属性
    const strengthVal = getVariableValue(variables, `${dataPrefix}.属性.力量`);
    if (strengthVal !== undefined && strengthVal !== null) strength.value = Number(strengthVal) || 0;

    const agilityVal = getVariableValue(variables, `${dataPrefix}.属性.敏捷`);
    if (agilityVal !== undefined && agilityVal !== null) agility.value = Number(agilityVal) || 0;

    const constitutionVal = getVariableValue(variables, `${dataPrefix}.属性.体质`);
    if (constitutionVal !== undefined && constitutionVal !== null) constitution.value = Number(constitutionVal) || 0;

    const intelligenceVal = getVariableValue(variables, `${dataPrefix}.属性.智力`);
    if (intelligenceVal !== undefined && intelligenceVal !== null) intelligence.value = Number(intelligenceVal) || 0;

    const spiritVal = getVariableValue(variables, `${dataPrefix}.属性.精神`);
    if (spiritVal !== undefined && spiritVal !== null) spirit.value = Number(spiritVal) || 0;

    const availablePointsVal = getVariableValue(variables, `${dataPrefix}.属性.可用属性点`);
    if (availablePointsVal !== undefined && availablePointsVal !== null)
      availablePoints.value = Number(availablePointsVal) || 0;

    // 读取灵魂觉醒度
    const soulAwakeningValue = getVariableValue(variables, `${dataPrefix}.灵魂觉醒度`);
    const soulCurrentVal = extractCurrentValue(soulAwakeningValue);
    if (soulCurrentVal !== null) soulAwakeningCurrent.value = soulCurrentVal;
    const soulMaxFromObj = extractMaxValue(soulAwakeningValue);
    if (soulMaxFromObj !== null) soulAwakeningMax.value = soulMaxFromObj;
    const soulMaxVal = getVariableValue(variables, `${dataPrefix}.灵魂觉醒度上限`);
    if (typeof soulMaxVal === 'number') soulAwakeningMax.value = soulMaxVal;

    // 读取角色列表：主角 + 同伴
    const characters: string[] = [];

    // 使用前面已经读取的主角名称
    if (typeof protagonistName === 'string' && protagonistName.trim()) {
      characters.push(protagonistName);
    } else {
      // 如果没有主角名称，使用默认值
      characters.push('主角');
    }

    // 读取同伴列表
    const companions = getVariableValue(variables, 'stat_data.同伴');

    if (companions !== undefined && companions !== null) {
      // 如果是数组格式
      if (Array.isArray(companions)) {
        companions.forEach((companion: unknown) => {
          let companionName: string | null = null;

          if (typeof companion === 'string') {
            companionName = companion;
          } else if (typeof companion === 'object' && companion !== null) {
            const companionObj = companion as Record<string, unknown>;
            if (typeof companionObj.名称 === 'string') {
              companionName = companionObj.名称;
            } else if (typeof companionObj.name === 'string') {
              companionName = companionObj.name;
            }
          }

          // 如果找到了同伴名称且不在列表中，则添加
          if (companionName && companionName.trim() && !characters.includes(companionName)) {
            characters.push(companionName);
          }
        });
      }
      // 如果是对象格式（键是角色名，值是角色信息）
      else if (typeof companions === 'object') {
        Object.keys(companions).forEach(key => {
          const companionData = (companions as Record<string, unknown>)[key];
          let companionName: string | null = null;

          // 如果值是对象，尝试从对象中获取名称
          if (typeof companionData === 'object' && companionData !== null) {
            const companionObj = companionData as Record<string, unknown>;
            if (typeof companionObj.名称 === 'string') {
              companionName = companionObj.名称;
            } else if (typeof companionObj.name === 'string') {
              companionName = companionObj.name;
            } else {
              // 如果对象中没有名称字段，使用键名
              companionName = key;
            }
          } else if (typeof companionData === 'string') {
            // 如果值是字符串，使用该字符串作为名称
            companionName = companionData;
          } else {
            // 其他情况，使用键名
            companionName = key;
          }

          // 如果找到了同伴名称且不在列表中，则添加
          if (companionName && companionName.trim() && !characters.includes(companionName)) {
            characters.push(companionName);
          }
        });
      }
    }

    // 更新角色列表
    if (characters.length > 0) {
      partyCharacters.value = characters;
      // 如果当前选中的角色不在新列表中，重置为第一个角色
      if (!partyCharacters.value.includes(selectedCharacter.value)) {
        selectedCharacter.value = partyCharacters.value[0];
      }
    }

    // 更新当前角色的物品栏、装备和技能数据
    updateInventoryData(variables);
    updateEquipmentData(variables);
    updateSkillsData(variables);
    updateQuestData(variables);
  } catch (error) {
    console.warn('读取健康状态数据失败，使用默认值:', error);
  }
}

/**
 * 从酒馆变量读取技能数据
 */
function updateSkillsData(variables: unknown) {
  try {
    // 保存当前选中的技能名称，以便在数据更新后恢复选中状态
    const currentSelectedSkillName =
      selectedSkillIndex.value !== null &&
      selectedSkillIndex.value >= 0 &&
      selectedSkillIndex.value < displayedSkills.value.length
        ? displayedSkills.value[selectedSkillIndex.value]?.name
        : null;
    const currentSelectedSkillType = selectedSkillType.value;

    // 获取主角名称，用于判断是否是主角
    const protagonistName = getVariableValue(variables, 'stat_data.主角.名称');
    const isProtagonist = isProtagonistCharacter(selectedCharacter.value, protagonistName);

    // 根据选中的角色构建数据路径前缀
    const basePath = getCharacterDataPrefix(selectedCharacter.value, protagonistName);
    const skillsPath = `${basePath}.技能列表`;

    // 辅助函数：读取技能消耗
    const getSkillCost = (skillName: string, isActive: boolean): unknown => {
      const skillTypePath = isActive ? '主动技能' : '被动技能';
      const costPath = `${basePath}.技能列表.${skillTypePath}.${skillName}.消耗`;
      return getVariableValue(variables, costPath);
    };

    // 读取技能列表
    const skillsData = getVariableValue(variables, skillsPath);
    skillsItems.value = [];

    if (skillsData !== undefined && skillsData !== null) {
      // 统一的技能解析函数
      const parseSkills = (skills: unknown, isActive: boolean) => {
        if (Array.isArray(skills)) {
          skills.forEach((skill: unknown) => {
            if (typeof skill === 'string') {
              skillsItems.value.push({ name: skill, isActive });
            } else if (typeof skill === 'object' && skill !== null) {
              skillsItems.value.push(
                parseSingleSkill(skill as Record<string, unknown>, '未知技能', isActive, getSkillCost),
              );
            }
          });
        } else if (typeof skills === 'object' && skills !== null) {
          // 如果是对象格式（键是技能名，值是技能信息）
          Object.keys(skills).forEach(skillName => {
            const skillData = (skills as Record<string, unknown>)[skillName];
            if (typeof skillData === 'string') {
              skillsItems.value.push({ name: skillData, isActive });
            } else if (typeof skillData === 'object' && skillData !== null) {
              skillsItems.value.push(
                parseSingleSkill(skillData as Record<string, unknown>, skillName, isActive, getSkillCost),
              );
            }
          });
        }
      };

      // 如果技能列表包含主动技能和被动技能两个子对象
      if (typeof skillsData === 'object' && !Array.isArray(skillsData)) {
        const skillsObj = skillsData as Record<string, unknown>;

        // 读取主动技能
        const activeSkillsData = skillsObj.主动技能 || skillsObj.active;
        if (activeSkillsData !== undefined && activeSkillsData !== null) {
          parseSkills(activeSkillsData, true);
        }

        // 读取被动技能
        const passiveSkillsData = skillsObj.被动技能 || skillsObj.passive;
        if (passiveSkillsData !== undefined && passiveSkillsData !== null) {
          parseSkills(passiveSkillsData, false);
        }

        // 如果没有找到主动技能和被动技能子对象，尝试作为普通对象或数组处理
        if (skillsItems.value.length === 0) {
          // 如果是数组格式
          if (Array.isArray(skillsData)) {
            skillsItems.value = skillsData.map((skill: unknown) => {
              if (typeof skill === 'string') {
                return {
                  name: skill,
                  isActive: true, // 默认为主动技能
                };
              } else if (typeof skill === 'object' && skill !== null) {
                const skillObj = skill as Record<string, unknown>;
                return {
                  name: String(skillObj.名称 || skillObj.name || '未知技能'),
                  level:
                    typeof skillObj.等级 === 'number'
                      ? skillObj.等级
                      : typeof skillObj.level === 'number'
                        ? skillObj.level
                        : undefined,
                  icon:
                    typeof skillObj.图标 === 'string'
                      ? skillObj.图标
                      : typeof skillObj.icon === 'string'
                        ? skillObj.icon
                        : undefined,
                  description:
                    typeof skillObj.描述 === 'string'
                      ? skillObj.描述
                      : typeof skillObj.description === 'string'
                        ? skillObj.description
                        : undefined,
                  type:
                    typeof skillObj.类型 === 'string'
                      ? skillObj.类型
                      : typeof skillObj.type === 'string'
                        ? skillObj.type
                        : undefined,
                  // 判断是否为主动技能：如果存在 isActive 字段，使用它；如果存在 主动技能 或 active 字段，使用它；否则默认为主动技能
                  isActive:
                    skillObj.isActive !== undefined
                      ? Boolean(skillObj.isActive)
                      : skillObj.主动技能 !== undefined
                        ? Boolean(skillObj.主动技能)
                        : skillObj.active !== undefined
                          ? Boolean(skillObj.active)
                          : skillObj.被动技能 !== undefined
                            ? !skillObj.被动技能
                            : skillObj.passive !== undefined
                              ? !skillObj.passive
                              : true, // 默认为主动技能
                };
              }
              return {
                name: '未知技能',
                isActive: true,
              };
            });
          }
          // 如果是对象格式（键是技能名，值是技能信息）
          else {
            Object.keys(skillsData).forEach(skillName => {
              const skillData = (skillsData as Record<string, unknown>)[skillName];
              if (typeof skillData === 'string') {
                skillsItems.value.push({
                  name: skillData,
                  isActive: true,
                });
              } else if (typeof skillData === 'object' && skillData !== null) {
                const skillObj = skillData as Record<string, unknown>;
                skillsItems.value.push({
                  name: String(skillObj.名称 || skillObj.name || skillName),
                  level:
                    typeof skillObj.等级 === 'number'
                      ? skillObj.等级
                      : typeof skillObj.level === 'number'
                        ? skillObj.level
                        : undefined,
                  icon:
                    typeof skillObj.图标 === 'string'
                      ? skillObj.图标
                      : typeof skillObj.icon === 'string'
                        ? skillObj.icon
                        : undefined,
                  description:
                    typeof skillObj.描述 === 'string'
                      ? skillObj.描述
                      : typeof skillObj.description === 'string'
                        ? skillObj.description
                        : undefined,
                  type:
                    typeof skillObj.类型 === 'string'
                      ? skillObj.类型
                      : typeof skillObj.type === 'string'
                        ? skillObj.type
                        : undefined,
                  rarity:
                    typeof skillObj.稀有度 === 'string'
                      ? skillObj.稀有度
                      : typeof skillObj.rarity === 'string'
                        ? skillObj.rarity
                        : undefined,
                  isActive:
                    skillObj.isActive !== undefined
                      ? Boolean(skillObj.isActive)
                      : skillObj.主动技能 !== undefined
                        ? Boolean(skillObj.主动技能)
                        : skillObj.active !== undefined
                          ? Boolean(skillObj.active)
                          : skillObj.被动技能 !== undefined
                            ? !skillObj.被动技能
                            : skillObj.passive !== undefined
                              ? !skillObj.passive
                              : true,
                });
              }
            });
          }
        }
      }
    }

    // 尝试恢复之前选中的技能
    if (currentSelectedSkillName && currentSelectedSkillType === selectedSkillType.value) {
      const index = displayedSkills.value.findIndex(skill => skill.name === currentSelectedSkillName);
      if (index >= 0) {
        selectedSkillIndex.value = index;
      } else {
        // 如果找不到之前的技能，重置为 null
        selectedSkillIndex.value = null;
      }
    } else {
      // 如果之前没有选中的技能，或者技能类型改变了，重置为 null
      selectedSkillIndex.value = null;
    }
  } catch (error) {
    console.warn('读取技能数据失败:', error);
    skillsItems.value = [];
  }
}

/**
 * 更新物品栏数据
 */
function updateInventoryData(variables: unknown) {
  try {
    // 获取主角名称，用于判断是否是主角
    const protagonistName = getVariableValue(variables, 'stat_data.主角.名称');
    const isProtagonist = isProtagonistCharacter(selectedCharacter.value, protagonistName);
    const dataPrefix = getCharacterDataPrefix(selectedCharacter.value, protagonistName);

    // 读取当前角色的负重信息
    if (isProtagonist) {
      const currentWeightVal = getVariableValue(variables, 'stat_data.主角.负重管理.当前负重');
      const maxWeightVal = getVariableValue(variables, 'stat_data.主角.负重管理.最大负重');
      if (typeof currentWeightVal === 'number') currentWeight.value = currentWeightVal;
      if (typeof maxWeightVal === 'number') maxWeight.value = maxWeightVal;
    } else {
      const currentWeightVal = getVariableValue(
        variables,
        `stat_data.同伴.${selectedCharacter.value}.负重管理.当前负重`,
      );
      const maxWeightVal = getVariableValue(variables, `stat_data.同伴.${selectedCharacter.value}.负重管理.最大负重`);
      if (typeof currentWeightVal === 'number') currentWeight.value = currentWeightVal;
      if (typeof maxWeightVal === 'number') maxWeight.value = maxWeightVal;
    }

    // 读取当前角色的钱包信息（金币、银币、铜币）
    if (isProtagonist) {
      const goldVal = getVariableValue(variables, 'stat_data.主角.钱包.金币');
      const silverVal = getVariableValue(variables, 'stat_data.主角.钱包.银币');
      const copperVal = getVariableValue(variables, 'stat_data.主角.钱包.铜币');
      wallet.value = {
        gold: typeof goldVal === 'number' ? goldVal : 0,
        silver: typeof silverVal === 'number' ? silverVal : 0,
        copper: typeof copperVal === 'number' ? copperVal : 0,
      };
    } else {
      const goldVal = getVariableValue(variables, `stat_data.同伴.${selectedCharacter.value}.钱包.金币`);
      const silverVal = getVariableValue(variables, `stat_data.同伴.${selectedCharacter.value}.钱包.银币`);
      const copperVal = getVariableValue(variables, `stat_data.同伴.${selectedCharacter.value}.钱包.铜币`);
      wallet.value = {
        gold: typeof goldVal === 'number' ? goldVal : 0,
        silver: typeof silverVal === 'number' ? silverVal : 0,
        copper: typeof copperVal === 'number' ? copperVal : 0,
      };
    }

    // 构建物品栏路径
    let inventoryPath: string;
    if (isProtagonist) {
      // 主角的物品栏路径
      inventoryPath = 'stat_data.主角.物品栏';
    } else {
      // 同伴的物品栏路径：stat_data.同伴.{同伴名}.物品栏
      inventoryPath = `stat_data.同伴.${selectedCharacter.value}.物品栏`;
    }

    const inventoryData = getVariableValue(variables, inventoryPath);

    if (Array.isArray(inventoryData)) {
      inventoryItems.value = inventoryData.map((item: unknown) => {
        let itemName: string;
        if (typeof item === 'string') {
          itemName = item;
        } else if (typeof item === 'object' && item !== null) {
          const itemObj = item as Record<string, unknown>;
          itemName = String(itemObj.名称 || itemObj.name || '未知物品');
        } else {
          itemName = String(item);
        }

        // 构建路径读取重量和价值
        const weightPath = `${dataPrefix}.物品栏.${itemName}.重量`;
        const valuePath = `${dataPrefix}.物品栏.${itemName}.价值`;
        const weight = getVariableValue(variables, weightPath);
        const itemValue = getVariableValue(variables, valuePath);

        if (typeof item === 'string') {
          return {
            name: itemName,
            count: 1,
            weight: typeof weight === 'number' ? weight : undefined,
            value: typeof itemValue === 'number' ? itemValue : undefined,
          };
        }
        if (typeof item === 'object' && item !== null) {
          const itemObj = item as Record<string, unknown>;
          return {
            name: itemName,
            count: Number(itemObj.数量 || itemObj.count || 1),
            icon: typeof itemObj.图标 === 'string' ? itemObj.图标 : undefined,
            description:
              typeof itemObj.描述 === 'string'
                ? itemObj.描述
                : typeof itemObj.description === 'string'
                  ? itemObj.description
                  : undefined,
            rarity:
              typeof itemObj.稀有度 === 'string'
                ? itemObj.稀有度
                : typeof itemObj.rarity === 'string'
                  ? itemObj.rarity
                  : undefined,
            weight: typeof weight === 'number' ? weight : undefined,
            value: typeof itemValue === 'number' ? itemValue : undefined,
          };
        }
        return {
          name: itemName,
          count: 1,
          weight: typeof weight === 'number' ? weight : undefined,
          value: typeof itemValue === 'number' ? itemValue : undefined,
        };
      });
    } else if (inventoryData && typeof inventoryData === 'object') {
      // 如果是对象格式，转换为数组
      const items: Array<{
        name: string;
        count: number;
        icon?: string;
        description?: string;
        rarity?: string;
        weight?: number;
        value?: number;
      }> = [];
      Object.entries(inventoryData as Record<string, unknown>).forEach(([key, value]) => {
        let itemName: string;
        if (typeof value === 'object' && value !== null) {
          const itemObj = value as Record<string, unknown>;
          itemName = String(itemObj.名称 || itemObj.name || key);
        } else {
          itemName = key;
        }

        // 构建路径读取重量和价值
        const weightPath = `${dataPrefix}.物品栏.${itemName}.重量`;
        const valuePath = `${dataPrefix}.物品栏.${itemName}.价值`;
        const weight = getVariableValue(variables, weightPath);
        const itemValue = getVariableValue(variables, valuePath);

        if (typeof value === 'number') {
          items.push({
            name: itemName,
            count: value,
            weight: typeof weight === 'number' ? weight : undefined,
            value: typeof itemValue === 'number' ? itemValue : undefined,
          });
        } else if (typeof value === 'object' && value !== null) {
          const itemObj = value as Record<string, unknown>;
          items.push({
            name: itemName,
            count: Number(itemObj.数量 || itemObj.count || 1),
            icon: typeof itemObj.图标 === 'string' ? itemObj.图标 : undefined,
            description:
              typeof itemObj.描述 === 'string'
                ? itemObj.描述
                : typeof itemObj.description === 'string'
                  ? itemObj.description
                  : undefined,
            rarity:
              typeof itemObj.稀有度 === 'string'
                ? itemObj.稀有度
                : typeof itemObj.rarity === 'string'
                  ? itemObj.rarity
                  : undefined,
            weight: typeof weight === 'number' ? weight : undefined,
            value: typeof itemValue === 'number' ? itemValue : undefined,
          });
        }
      });
      inventoryItems.value = items;
    } else {
      inventoryItems.value = [];
    }

    // 只有在物品列表为空或选中索引超出范围时才重置选中状态
    // 这样可以保持用户点击的物品描述持续显示
    if (inventoryItems.value.length === 0) {
      selectedItemIndex.value = null;
    } else if (selectedItemIndex.value !== null && selectedItemIndex.value >= inventoryItems.value.length) {
      // 如果选中的索引超出范围，重置为null
      selectedItemIndex.value = null;
    }
    // 否则保持当前的选中状态不变
  } catch (error) {
    console.warn('读取物品栏数据失败:', error);
    inventoryItems.value = [];
    selectedItemIndex.value = null;
  }
}

/**
 * 解析通用装备数据（武器、防具、饰品通用）
 */
function parseEquipmentData(
  data: unknown,
  defaultName: string,
): {
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
  weaponPower?: number;
} | null {
  if (data && typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    return {
      name: String(obj.名称 || obj.name || defaultName),
      icon: typeof obj.图标 === 'string' ? obj.图标 : typeof obj.icon === 'string' ? obj.icon : undefined,
      description:
        typeof obj.描述 === 'string' ? obj.描述 : typeof obj.description === 'string' ? obj.description : undefined,
      rarity: typeof obj.稀有度 === 'string' ? obj.稀有度 : typeof obj.rarity === 'string' ? obj.rarity : undefined,
      type: typeof obj.类型 === 'string' ? obj.类型 : typeof obj.type === 'string' ? obj.type : undefined,
      equipmentPoints:
        typeof obj.装备点数 === 'number'
          ? obj.装备点数
          : typeof obj.equipmentPoints === 'number'
            ? obj.equipmentPoints
            : undefined,
      specialEffects:
        typeof obj.特殊效果 === 'string'
          ? obj.特殊效果
          : typeof obj.specialEffects === 'string'
            ? obj.specialEffects
            : undefined,
      weight: typeof obj.重量 === 'number' ? obj.重量 : typeof obj.weight === 'number' ? obj.weight : undefined,
      value: typeof obj.价值 === 'number' ? obj.价值 : typeof obj.value === 'number' ? obj.value : undefined,
      weaponPower:
        typeof obj.武器威力 === 'number'
          ? obj.武器威力
          : typeof obj.weaponPower === 'number'
            ? obj.weaponPower
            : undefined,
    };
  } else if (typeof data === 'string') {
    return { name: data };
  } else {
    return null;
  }
}

/**
 * 解析防具数据（兼容旧接口）
 */
function parseArmorData(data: unknown): {
  name: string;
  icon?: string;
  description?: string;
  rarity?: string;
  type?: string;
  equipmentPoints?: number;
  specialEffects?: string;
  weight?: number;
  value?: number;
} | null {
  return parseEquipmentData(data, '未知防具');
}

/**
 * 更新装备数据
 */
function updateEquipmentData(variables: unknown) {
  try {
    // 获取主角名称，用于判断是否是主角
    const protagonistName = getVariableValue(variables, 'stat_data.主角.名称');
    const isProtagonist = isProtagonistCharacter(selectedCharacter.value, protagonistName);
    const dataPrefix = getCharacterDataPrefix(selectedCharacter.value, protagonistName);

    // 读取可装备点数上限
    const limit = getVariableValue(variables, `${dataPrefix}.可装备点数上限`);
    equipmentPointsLimit.value = typeof limit === 'number' ? limit : 0;

    // 读取武器数据
    const equipmentBasePath = `${dataPrefix}.装备栏`;

    // 读取主手和副手武器
    if (isProtagonist) {
      // 主角的武器：从 stat_data.主角.装备栏.武器.主手/副手 中读取
      const mainHandData = getVariableValue(variables, `${equipmentBasePath}.武器.主手`);
      mainHand.value = parseEquipmentData(mainHandData, '未知武器') as typeof mainHand.value;

      const offHandData = getVariableValue(variables, `${equipmentBasePath}.武器.副手`);
      offHand.value = parseEquipmentData(offHandData, '未知武器') as typeof offHand.value;
    } else {
      // 同伴的武器：从 stat_data.同伴.{同伴名}.装备栏.武器 中读取
      const weaponsData = getVariableValue(variables, `${equipmentBasePath}.武器`);
      if (weaponsData && typeof weaponsData === 'object' && weaponsData !== null) {
        const weaponsObj = weaponsData as Record<string, unknown>;

        // 读取主手武器
        const mainHandData = weaponsObj.主手 || weaponsObj.mainHand;
        mainHand.value = parseEquipmentData(mainHandData, '未知武器') as typeof mainHand.value;

        // 读取副手武器
        const offHandData = weaponsObj.副手 || weaponsObj.offHand;
        offHand.value = parseEquipmentData(offHandData, '未知武器') as typeof offHand.value;
      } else {
        // 如果没有武器数据，重置为空
        mainHand.value = null;
        offHand.value = null;
      }
    }

    // 读取防具数据
    const armorParts = ['头部', '上装', '腰带', '手套', '下装', '鞋部'] as const;
    const armorRefs = [armorHead, armorChest, armorBelt, armorGloves, armorLegs, armorFeet] as const;

    if (isProtagonist) {
      // 主角的防具数据：从 stat_data.主角.装备栏.防具.{部位} 中读取
      armorParts.forEach((part, index) => {
        const armorData = getVariableValue(variables, `${equipmentBasePath}.防具.${part}`);
        armorRefs[index].value = parseArmorData(armorData);
      });
    } else {
      // 同伴的防具数据：从 stat_data.同伴.{同伴名}.装备栏.防具 中读取
      const armorData = getVariableValue(variables, `${equipmentBasePath}.防具`);
      if (armorData && typeof armorData === 'object' && armorData !== null) {
        const armorObj = armorData as Record<string, unknown>;
        armorParts.forEach((part, index) => {
          const partData = armorObj[part] || armorObj[part.toLowerCase()];
          armorRefs[index].value = parseArmorData(partData);
        });
      } else {
        // 如果没有防具数据，重置为空
        armorRefs.forEach(ref => {
          ref.value = null;
        });
      }
    }

    // 读取饰品数据
    // 读取戒指（数组格式，最多4个）
    const ringsData = getVariableValue(variables, `${equipmentBasePath}.饰品.戒指`);
    if (Array.isArray(ringsData)) {
      rings.value = ringsData.slice(0, 4).map((ring: unknown) => {
        const parsed = parseEquipmentData(ring, '未知戒指');
        return parsed ? { ...parsed, weaponPower: undefined } : null;
      });
      // 如果不足4个，用null填充
      while (rings.value.length < 4) {
        rings.value.push(null);
      }
    } else {
      rings.value = [null, null, null, null];
    }

    // 读取项链
    const necklaceData = getVariableValue(variables, `${equipmentBasePath}.饰品.项链`);
    const parsedNecklace = parseEquipmentData(necklaceData, '未知项链');
    if (parsedNecklace) {
      necklace.value = { ...parsedNecklace, weaponPower: undefined };
    } else {
      necklace.value = null;
    }

    // 读取耳环
    const earringData = getVariableValue(variables, `${equipmentBasePath}.饰品.耳环`);
    const parsedEarring = parseEquipmentData(earringData, '未知耳环');
    if (parsedEarring) {
      earring.value = { ...parsedEarring, weaponPower: undefined };
    } else {
      earring.value = null;
    }
  } catch (error) {
    console.warn('读取装备数据失败:', error);
    // 重置为默认值
    mainHand.value = null;
    offHand.value = null;
    armorHead.value = null;
    armorChest.value = null;
    armorBelt.value = null;
    armorGloves.value = null;
    armorLegs.value = null;
    armorFeet.value = null;
    rings.value = [null, null, null, null];
    necklace.value = null;
    earring.value = null;
  }
}

/**
 * 更新任务数据
 */
function updateQuestData(variables: unknown) {
  try {
    // 保存当前选中的任务名称，以便在数据更新后恢复选中状态
    const currentSelectedQuestName =
      selectedQuestIndex.value !== null &&
      selectedQuestIndex.value >= 0 &&
      selectedQuestIndex.value < displayedQuests.value.length
        ? displayedQuests.value[selectedQuestIndex.value]?.name
        : null;
    const currentSelectedQuestType = selectedQuestType.value;

    // 读取任务日志
    const questLogData = getVariableValue(variables, 'stat_data.世界.任务日志');
    questItems.value = [];

    if (questLogData !== undefined && questLogData !== null) {
      // 如果任务日志是对象格式
      if (typeof questLogData === 'object' && !Array.isArray(questLogData)) {
        const questLogObj = questLogData as Record<string, unknown>;

        // 读取主线任务
        const mainQuestsData = questLogObj.主线任务 || questLogObj.主线 || questLogObj.main || questLogObj.mainQuests;
        if (mainQuestsData !== undefined && mainQuestsData !== null) {
          parseQuests(mainQuestsData, '主线');
        }

        // 读取支线任务
        const sideQuestsData = questLogObj.支线任务 || questLogObj.支线 || questLogObj.side || questLogObj.sideQuests;
        if (sideQuestsData !== undefined && sideQuestsData !== null) {
          parseQuests(sideQuestsData, '支线');
        }

        // 如果没有找到主线任务和支线任务子对象，尝试作为普通对象或数组处理
        if (questItems.value.length === 0) {
          // 如果是数组格式
          if (Array.isArray(questLogData)) {
            questItems.value = questLogData.map((quest: unknown) => {
              if (typeof quest === 'string') {
                return {
                  name: quest,
                  questType: '主线', // 默认为主线任务
                };
              } else if (typeof quest === 'object' && quest !== null) {
                const questObj = quest as Record<string, unknown>;
                return {
                  name: String(questObj.名称 || questObj.name || '未知任务'),
                  status:
                    typeof questObj.状态 === 'string'
                      ? questObj.状态
                      : typeof questObj.status === 'string'
                        ? questObj.status
                        : undefined,
                  type:
                    typeof questObj.类型 === 'string'
                      ? questObj.类型
                      : typeof questObj.type === 'string'
                        ? questObj.type
                        : undefined,
                  questType:
                    typeof questObj.任务类型 === 'string'
                      ? questObj.任务类型
                      : typeof questObj.questType === 'string'
                        ? questObj.questType
                        : '主线',
                  description:
                    typeof questObj.描述 === 'string'
                      ? questObj.描述
                      : typeof questObj.description === 'string'
                        ? questObj.description
                        : undefined,
                  objectives: Array.isArray(questObj.目标)
                    ? questObj.目标.map((o: unknown) => String(o))
                    : Array.isArray(questObj.objectives)
                      ? questObj.objectives.map((o: unknown) => String(o))
                      : undefined,
                  rewards: Array.isArray(questObj.奖励)
                    ? questObj.奖励.map((r: unknown) => String(r))
                    : Array.isArray(questObj.rewards)
                      ? questObj.rewards.map((r: unknown) => String(r))
                      : undefined,
                };
              }
              return {
                name: '未知任务',
                questType: '主线',
              };
            });
          } else {
            // 如果是对象格式（键是任务名，值是任务信息）
            Object.keys(questLogData).forEach(questName => {
              const questData = (questLogData as Record<string, unknown>)[questName];
              if (typeof questData === 'string') {
                questItems.value.push({
                  name: questData,
                  questType: '主线',
                });
              } else if (typeof questData === 'object' && questData !== null) {
                const questObj = questData as Record<string, unknown>;
                questItems.value.push({
                  name: String(questObj.名称 || questObj.name || questName),
                  status:
                    typeof questObj.状态 === 'string'
                      ? questObj.状态
                      : typeof questObj.status === 'string'
                        ? questObj.status
                        : undefined,
                  type:
                    typeof questObj.类型 === 'string'
                      ? questObj.类型
                      : typeof questObj.type === 'string'
                        ? questObj.type
                        : undefined,
                  questType:
                    typeof questObj.任务类型 === 'string'
                      ? questObj.任务类型
                      : typeof questObj.questType === 'string'
                        ? questObj.questType
                        : '主线',
                  description:
                    typeof questObj.描述 === 'string'
                      ? questObj.描述
                      : typeof questObj.description === 'string'
                        ? questObj.description
                        : undefined,
                  objectives: Array.isArray(questObj.目标)
                    ? questObj.目标.map((o: unknown) => String(o))
                    : Array.isArray(questObj.objectives)
                      ? questObj.objectives.map((o: unknown) => String(o))
                      : undefined,
                  rewards: Array.isArray(questObj.奖励)
                    ? questObj.奖励.map((r: unknown) => String(r))
                    : Array.isArray(questObj.rewards)
                      ? questObj.rewards.map((r: unknown) => String(r))
                      : undefined,
                });
              }
            });
          }
        }
      } else if (Array.isArray(questLogData)) {
        // 如果任务日志直接是数组格式
        questItems.value = questLogData.map((quest: unknown) => {
          if (typeof quest === 'string') {
            return {
              name: quest,
              questType: '主线',
            };
          } else if (typeof quest === 'object' && quest !== null) {
            const questObj = quest as Record<string, unknown>;
            return {
              name: String(questObj.名称 || questObj.name || '未知任务'),
              status:
                typeof questObj.状态 === 'string'
                  ? questObj.状态
                  : typeof questObj.status === 'string'
                    ? questObj.status
                    : undefined,
              type:
                typeof questObj.类型 === 'string'
                  ? questObj.类型
                  : typeof questObj.type === 'string'
                    ? questObj.type
                    : undefined,
              questType:
                typeof questObj.任务类型 === 'string'
                  ? questObj.任务类型
                  : typeof questObj.questType === 'string'
                    ? questObj.questType
                    : '主线',
              description:
                typeof questObj.描述 === 'string'
                  ? questObj.描述
                  : typeof questObj.description === 'string'
                    ? questObj.description
                    : undefined,
              objectives: Array.isArray(questObj.目标)
                ? questObj.目标.map((o: unknown) => String(o))
                : Array.isArray(questObj.objectives)
                  ? questObj.objectives.map((o: unknown) => String(o))
                  : undefined,
              rewards: Array.isArray(questObj.奖励)
                ? questObj.奖励.map((r: unknown) => String(r))
                : Array.isArray(questObj.rewards)
                  ? questObj.rewards.map((r: unknown) => String(r))
                  : undefined,
            };
          }
          return {
            name: '未知任务',
            questType: '主线',
          };
        });
      }
    }

    // 尝试恢复之前选中的任务
    if (currentSelectedQuestName && currentSelectedQuestType === selectedQuestType.value) {
      const index = displayedQuests.value.findIndex(quest => quest.name === currentSelectedQuestName);
      if (index >= 0) {
        selectedQuestIndex.value = index;
      } else {
        // 如果找不到之前的任务，重置为 null
        selectedQuestIndex.value = null;
      }
    } else {
      // 如果之前没有选中的任务，或者任务类型改变了，重置为 null
      selectedQuestIndex.value = null;
    }
  } catch (error) {
    console.warn('读取任务数据失败:', error);
    questItems.value = [];
  }
}

/**
 * 解析任务数据
 */
function parseQuests(questsData: unknown, defaultQuestType: '主线' | '支线') {
  if (Array.isArray(questsData)) {
    questsData.forEach((quest: unknown) => {
      if (typeof quest === 'string') {
        questItems.value.push({
          name: quest,
          questType: defaultQuestType,
        });
      } else if (typeof quest === 'object' && quest !== null) {
        const questObj = quest as Record<string, unknown>;
        questItems.value.push({
          name: String(questObj.名称 || questObj.name || '未知任务'),
          status:
            typeof questObj.状态 === 'string'
              ? questObj.状态
              : typeof questObj.status === 'string'
                ? questObj.status
                : undefined,
          type:
            typeof questObj.类型 === 'string'
              ? questObj.类型
              : typeof questObj.type === 'string'
                ? questObj.type
                : undefined,
          questType:
            typeof questObj.任务类型 === 'string'
              ? questObj.任务类型
              : typeof questObj.questType === 'string'
                ? questObj.questType
                : defaultQuestType,
          description:
            typeof questObj.描述 === 'string'
              ? questObj.描述
              : typeof questObj.description === 'string'
                ? questObj.description
                : undefined,
          objectives: Array.isArray(questObj.目标)
            ? questObj.目标.map((o: unknown) => String(o))
            : Array.isArray(questObj.objectives)
              ? questObj.objectives.map((o: unknown) => String(o))
              : undefined,
          rewards: Array.isArray(questObj.奖励)
            ? questObj.奖励.map((r: unknown) => String(r))
            : Array.isArray(questObj.rewards)
              ? questObj.rewards.map((r: unknown) => String(r))
              : undefined,
        });
      }
    });
  } else if (typeof questsData === 'object' && questsData !== null) {
    // 如果是对象格式（键是任务名，值是任务信息）
    Object.keys(questsData).forEach(questName => {
      const questData = (questsData as Record<string, unknown>)[questName];
      if (typeof questData === 'string') {
        questItems.value.push({
          name: questData,
          questType: defaultQuestType,
        });
      } else if (typeof questData === 'object' && questData !== null) {
        const questObj = questData as Record<string, unknown>;
        questItems.value.push({
          name: String(questObj.名称 || questObj.name || questName),
          status:
            typeof questObj.状态 === 'string'
              ? questObj.状态
              : typeof questObj.status === 'string'
                ? questObj.status
                : undefined,
          type:
            typeof questObj.类型 === 'string'
              ? questObj.类型
              : typeof questObj.type === 'string'
                ? questObj.type
                : undefined,
          questType:
            typeof questObj.任务类型 === 'string'
              ? questObj.任务类型
              : typeof questObj.questType === 'string'
                ? questObj.questType
                : defaultQuestType,
          description:
            typeof questObj.描述 === 'string'
              ? questObj.描述
              : typeof questObj.description === 'string'
                ? questObj.description
                : undefined,
          objectives: Array.isArray(questObj.目标)
            ? questObj.目标.map((o: unknown) => String(o))
            : Array.isArray(questObj.objectives)
              ? questObj.objectives.map((o: unknown) => String(o))
              : undefined,
          rewards: Array.isArray(questObj.奖励)
            ? questObj.奖励.map((r: unknown) => String(r))
            : Array.isArray(questObj.rewards)
              ? questObj.rewards.map((r: unknown) => String(r))
              : undefined,
        });
      }
    });
  }
}

// ==================== 雷达图绘制 ====================
let checkInterval: ReturnType<typeof setInterval> | null = null;

/**
 * 绘制雷达图
 */
function drawRadarChart() {
  if (!radarCanvas.value) return;

  const canvas = radarCanvas.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 设置画布大小
  const size = Math.min(canvas.parentElement?.clientWidth || 200, 200);
  canvas.width = size;
  canvas.height = size;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  // 清空画布
  ctx.clearRect(0, 0, size, size);

  // 属性名称和值
  const attributes = [
    { name: '力量', value: strength.value, angle: -Math.PI / 2 },
    { name: '敏捷', value: agility.value, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { name: '体质', value: constitution.value, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { name: '智力', value: intelligence.value, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { name: '精神', value: spirit.value, angle: -Math.PI / 2 + (8 * Math.PI) / 5 },
  ];

  // 找到最大值用于归一化
  const maxValue = Math.max(...attributes.map(a => a.value), 1);

  // 绘制网格线
  ctx.strokeStyle = 'rgba(192, 192, 192, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // 绘制轴线
  ctx.strokeStyle = 'rgba(192, 192, 192, 0.5)';
  ctx.lineWidth = 1;
  attributes.forEach(attr => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const x = centerX + Math.cos(attr.angle) * radius;
    const y = centerY + Math.sin(attr.angle) * radius;
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // 绘制数据区域
  ctx.fillStyle = 'rgba(192, 192, 192, 0.3)';
  ctx.strokeStyle = '#c0c0c0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  attributes.forEach((attr, index) => {
    const normalizedValue = Math.min(attr.value / maxValue, 1);
    const r = radius * normalizedValue;
    const x = centerX + Math.cos(attr.angle) * r;
    const y = centerY + Math.sin(attr.angle) * r;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 绘制数据点
  ctx.fillStyle = '#ffffff';
  attributes.forEach(attr => {
    const normalizedValue = Math.min(attr.value / maxValue, 1);
    const r = radius * normalizedValue;
    const x = centerX + Math.cos(attr.angle) * r;
    const y = centerY + Math.sin(attr.angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  });

  // 绘制属性名称
  ctx.fillStyle = '#e0e0e0';
  ctx.font = '12px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  attributes.forEach(attr => {
    const x = centerX + Math.cos(attr.angle) * (radius + 15);
    const y = centerY + Math.sin(attr.angle) * (radius + 15);
    ctx.fillText(attr.name, x, y);
  });
}

// ==================== 生命周期 ====================
let resizeObserver: ResizeObserver | null = null;

// 监听属性变化，重新绘制雷达图
watch([strength, agility, constitution, intelligence, spirit], () => {
  nextTick(() => {
    drawRadarChart();
  });
});

// 监听角色切换，更新所有标签页的数据
watch(selectedCharacter, () => {
  selectedItemIndex.value = null; // 重置选中物品
  selectedAccessoryType.value = null; // 重置选中饰品
  selectedAccessoryIndex.value = null;
  selectedEquipmentIndex.value = null; // 重置选中装备
  selectedSkillIndex.value = null; // 重置选中技能
  showEquipmentDescription.value = true; // 重置为显示描述
  showAccessoryDescription.value = true; // 重置为显示描述
  if (typeof getCurrentMessageId === 'function' && typeof getVariables === 'function') {
    try {
      const message_id = getCurrentMessageId();
      const variables = getVariables({ type: 'message', message_id });
      updateHealthData(); // 更新主要信息标签页的数据
      updateInventoryData(variables);
      updateEquipmentData(variables);
      updateSkillsData(variables);
      updateQuestData(variables);
    } catch (error) {
      console.warn('切换角色时读取数据失败:', error);
    }
  }
});

// 初始化
onMounted(() => {
  updateHealthData();

  // 绘制雷达图
  nextTick(() => {
    drawRadarChart();

    // 监听画布大小变化
    if (radarCanvas.value && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        drawRadarChart();
      });
      resizeObserver.observe(radarCanvas.value);
    }
  });

  // 如果是在酒馆环境中，监听变量变化
  if (typeof getCurrentMessageId === 'function' && typeof getVariables === 'function') {
    // 使用定时器定期检查变量变化（因为变量可能被外部更新）
    checkInterval = setInterval(() => {
      try {
        const message_id = getCurrentMessageId();
        const variables = getVariables({ type: 'message', message_id });
        updateHealthData();
        updateInventoryData(variables);
        updateEquipmentData(variables);
        updateSkillsData(variables);
        updateQuestData(variables);
        nextTick(() => {
          drawRadarChart();
        });
      } catch (error) {
        console.warn('定时更新数据失败:', error);
      }
    }, 500); // 每 500ms 检查一次
  }
});

// 组件卸载时清除定时器和观察器
onUnmounted(() => {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.tab-navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 120px;
  flex-shrink: 0;
}

.tab-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
  color: #c0c0c0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 500;

  i {
    font-size: 20px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  span {
    white-space: nowrap;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
    color: #e0e0e0;

    i {
      color: #e0e0e0;
    }
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.2);
    border-color: #c0c0c0;
    color: #ffffff;
    font-weight: 600;

    i {
      color: #ffffff;
    }
  }
}

.health-container {
  flex: 1;
  background-color: #808080; // 灰色背景
  border: 3px solid #c0c0c0; // 银色边框
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
  min-width: 0;
}

.health-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(192, 192, 192, 0.5);

  i {
    font-size: 24px;
    color: #c0c0c0;
  }

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0; // 关键：确保可以正确计算 flex 子元素的高度
  overflow: hidden; // 防止内容溢出
}

.tab-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; // 关键：确保可以正确计算 flex 子元素的高度
  overflow: hidden; // 防止内容溢出
}

.skills-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.skills-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

// 技能布局样式
.skills-layout {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.skills-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.skill-type-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(192, 192, 192, 0.3);
}

.skill-type-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  color: #c0c0c0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 16px;
  }

  .tab-count {
    font-size: 12px;
    color: #a0a0a0;
    font-weight: 500;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.15);
    border-color: #c0c0c0;
    color: #e0e0e0;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.2);

    i {
      color: #d4af37; // 金色图标
    }

    .tab-count {
      color: #c0c0c0;
    }
  }
}

.skills-list-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: calc(5 * 68px + 4 * 8px); // 固定高度，确保始终显示5个技能的高度
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.skills-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;
}

.skills-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #c0c0c0;
  text-align: center;
  flex: 1;
  min-height: 0;

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.skill-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.15);
    border-color: #c0c0c0;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.2);
  }
}

.skill-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  color: #c0c0c0;
  font-size: 20px;
  flex-shrink: 0;
}

.skill-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.skill-name {
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #c0c0c0;
}

.skill-level,
.skill-type {
  padding: 2px 6px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.skills-description {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

// 技能描述区域复用物品描述样式，但需要添加特定样式
.skills-description .description-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #c0c0c0;
  text-align: center;
  flex: 1;
  min-height: 0;

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.skills-description .description-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skills-description .description-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(192, 192, 192, 0.3);
}

.skills-description .description-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  color: #c0c0c0;
  font-size: 28px;
  flex-shrink: 0;
}

.skills-description .description-title {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #e0e0e0;
  }
}

.skills-description .description-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #c0c0c0;
}

.skills-description .description-type,
.skills-description .description-level {
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.skills-description .description-cost {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(192, 192, 192, 0.2);
  border-radius: 6px;
  margin-top: 8px;

  .cost-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #d4af37;

    i {
      font-size: 14px;
    }
  }

  .cost-value {
    font-size: 14px;
    color: #e0e0e0;
    padding-left: 20px;
    word-break: break-word;
  }
}

.skills-description .description-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #e0e0e0;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

// ==================== 任务面板样式 ====================
.quest-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.quest-content {
  flex: 1;
  display: flex;
  gap: 20px;
  min-height: 0;
  overflow: hidden;
}

.quest-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: calc(5 * 68px + 4 * 8px);
  overflow-y: auto;
  overflow-x: hidden;
  gap: 8px;
}

.quest-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #c0c0c0;
  text-align: center;
  flex: 1;
  min-height: 0;

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.quest-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 60px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    border-color: rgba(192, 192, 192, 0.5);
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.15);
    border-color: #c0c0c0;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.2);
  }
}

.quest-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.quest-name {
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quest-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
}

.quest-status {
  padding: 3px 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  font-weight: 600;

  &.quest-status-active {
    color: #4caf50;
    background-color: rgba(76, 175, 80, 0.2);
  }

  &.quest-status-completed {
    color: #2196f3;
    background-color: rgba(33, 150, 243, 0.2);
  }

  &.quest-status-failed {
    color: #f44336;
    background-color: rgba(244, 67, 54, 0.2);
  }

  &.quest-status-abandoned {
    color: #9e9e9e;
    background-color: rgba(158, 158, 158, 0.2);
  }

  &.quest-status-available {
    color: #ff9800;
    background-color: rgba(255, 152, 0, 0.2);
  }

  &.quest-status-default {
    color: #c0c0c0;
  }
}

.quest-type {
  padding: 3px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: #c0c0c0;
}

.quest-description {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
  flex-shrink: 0;
}

.quest-description .description-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #c0c0c0;
  text-align: center;
  flex: 1;
  min-height: 0;

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.quest-description .description-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quest-description .description-header {
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(192, 192, 192, 0.3);
}

.quest-description .description-title {
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #e0e0e0;
  }
}

.quest-description .description-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #c0c0c0;
}

.quest-description .description-status {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  font-weight: 600;
}

.quest-description .description-type {
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.quest-description .description-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quest-description .description-text,
.quest-description .description-objectives,
.quest-description .description-rewards {
  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: #e0e0e0;
    border-bottom: 1px solid rgba(192, 192, 192, 0.2);
    padding-bottom: 8px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #c0c0c0;
    line-height: 1.6;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    list-style-type: disc;
    color: #c0c0c0;
    font-size: 14px;
    line-height: 1.8;

    li {
      margin-bottom: 8px;
    }
  }
}

// ==================== 装备样式 ====================
.equipment-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

// 可装备点数上限显示
.equipment-points-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  transition: all 0.2s ease;

  .points-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #c0c0c0;

    i {
      font-size: 16px;
      color: #d4af37; // 金色，表示点数
    }
  }

  .points-values {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 700;

    .points-current {
      color: #ffffff; // 白色，当前装备点数
      text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
    }

    .points-separator {
      color: #c0c0c0; // 银色分隔符
      font-weight: 500;
    }

    .points-limit {
      color: #d4af37; // 金色，上限
      text-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
    }
  }
}

.equipment-content {
  flex: 1;
  display: flex;
  gap: 20px;
  min-height: 0;
  overflow: hidden;
}

// 左侧：武器/防具
.equipment-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.equipment-type-selector {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
}

.type-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
  color: #c0c0c0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 16px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
    color: #e0e0e0;

    i {
      color: #e0e0e0;
    }
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.2);
    border-color: #c0c0c0;
    color: #ffffff;
    font-weight: 600;

    i {
      color: #ffffff;
    }
  }
}

.equipment-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

// 武器槽位样式
.weapon-slots {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.weapon-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

// 防具槽位样式
.armor-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.armor-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.armor-slot {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    border-color: #c0c0c0;
    background-color: rgba(192, 192, 192, 0.1);
    box-shadow: 0 0 8px rgba(192, 192, 192, 0.3);
  }

  &.empty {
    border-style: dashed;
    opacity: 0.6;
  }

  &:hover {
    border-color: #c0c0c0;
    background-color: rgba(192, 192, 192, 0.05);
  }

  .equipment-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    flex-shrink: 0;

    &.empty-slot {
      background-color: rgba(0, 0, 0, 0.3);
      border: 2px dashed rgba(192, 192, 192, 0.3);
      color: rgba(192, 192, 192, 0.5);
    }
  }

  .equipment-name {
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    flex: 1;
    word-break: break-word;
    line-height: 1.3;

    &.empty {
      color: rgba(192, 192, 192, 0.5);
      font-style: italic;
    }
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #c0c0c0;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  i {
    font-size: 16px;
  }

  .collapse-icon {
    margin-left: auto;
    font-size: 12px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.4);
    color: #e0e0e0;
  }
}

.weapon-slot {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    border-color: #c0c0c0;
    background-color: rgba(192, 192, 192, 0.1);
    box-shadow: 0 0 8px rgba(192, 192, 192, 0.3);
  }

  &.empty {
    border-style: dashed;
    opacity: 0.6;
  }

  &:hover {
    border-color: #c0c0c0;
    background-color: rgba(192, 192, 192, 0.05);
  }

  .equipment-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    flex-shrink: 0;

    &.empty-slot {
      background-color: rgba(0, 0, 0, 0.3);
      border: 2px dashed rgba(192, 192, 192, 0.3);
      color: rgba(192, 192, 192, 0.5);
    }
  }

  .equipment-name {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    flex: 1;

    &.empty {
      color: rgba(192, 192, 192, 0.5);
      font-style: italic;
    }
  }
}

.equipment-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.equipment-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #c0c0c0;
  text-align: center;

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.equipment-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.15);
    border-color: #c0c0c0;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.2);
  }
}

.equipment-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(192, 192, 192, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(192, 192, 192, 0.2);
  flex-shrink: 0;
  transition: all 0.2s ease;

  i {
    font-size: 20px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  // 稀有度颜色（复用物品栏的样式）
  &.rarity-common {
    border-color: #8b7355;
    background-color: rgba(139, 115, 85, 0.2);

    i {
      color: #8b7355;
    }
  }

  &.rarity-uncommon {
    border-color: #5b8a72;
    background-color: rgba(91, 138, 114, 0.2);

    i {
      color: #5b8a72;
    }
  }

  &.rarity-rare {
    border-color: #3a5f8c;
    background-color: rgba(58, 95, 140, 0.2);

    i {
      color: #3a5f8c;
    }
  }

  &.rarity-epic {
    border-color: #6a0dad;
    background-color: rgba(106, 13, 173, 0.2);

    i {
      color: #6a0dad;
    }
  }

  &.rarity-legendary {
    border-color: #d4af37;
    background-color: rgba(212, 175, 55, 0.2);

    i {
      color: #d4af37;
    }
  }

  &.rarity-unique {
    border-color: #b222dc;
    background-color: rgba(178, 34, 220, 0.2);

    i {
      color: #b222dc;
    }
  }

  &.rarity-mythic {
    border-color: #ffd700;
    background: linear-gradient(135deg, #ff0000, #ffd700);
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);

    i {
      color: #ffffff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
  }
}

.equipment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.equipment-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
  line-height: 1.3;
}

.equipment-rarity {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  transition: all 0.2s ease;
  align-self: flex-start;

  // 稀有度颜色（复用物品栏的样式）
  &.rarity-common {
    color: #8b7355;
    border: 1px solid #8b7355;
  }

  &.rarity-uncommon {
    color: #5b8a72;
    border: 1px solid #5b8a72;
  }

  &.rarity-rare {
    color: #3a5f8c;
    border: 1px solid #3a5f8c;
  }

  &.rarity-epic {
    color: #6a0dad;
    border: 1px solid #6a0dad;
  }

  &.rarity-legendary {
    color: #d4af37;
    border: 1px solid #d4af37;
  }

  &.rarity-unique {
    color: #b222dc;
    border: 1px solid #b222dc;
  }

  &.rarity-mythic {
    color: #ffffff;
    border: 1px solid #ffd700;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(255, 215, 0, 0.3));
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 4px rgba(255, 215, 0, 0.3);
  }
}

.equipment-description {
  min-height: 200px;
  max-height: 400px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

// 右侧：饰品
.equipment-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.accessories-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;

  i {
    font-size: 18px;
    color: #c0c0c0;
  }
}

.accessories-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.accessories-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.accessories-section .section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  i {
    font-size: 16px;
    color: #c0c0c0;
  }

  .collapse-icon {
    margin-left: auto;
    font-size: 12px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.4);
    color: #ffffff;
  }
}

.rings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.accessory-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 100px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.15);
    border-color: #c0c0c0;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.2);
  }

  &.empty {
    border-style: dashed;
  }
}

.accessory-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(192, 192, 192, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(192, 192, 192, 0.2);
  flex-shrink: 0;
  transition: all 0.2s ease;

  i {
    font-size: 24px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  &.empty-slot {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(192, 192, 192, 0.2);
    border-style: dashed;

    i {
      color: rgba(192, 192, 192, 0.5);
      font-size: 20px;
    }
  }

  // 稀有度颜色（复用物品栏的样式）
  &.rarity-common {
    border-color: #8b7355;
    background-color: rgba(139, 115, 85, 0.2);

    i {
      color: #8b7355;
    }
  }

  &.rarity-uncommon {
    border-color: #5b8a72;
    background-color: rgba(91, 138, 114, 0.2);

    i {
      color: #5b8a72;
    }
  }

  &.rarity-rare {
    border-color: #3a5f8c;
    background-color: rgba(58, 95, 140, 0.2);

    i {
      color: #3a5f8c;
    }
  }

  &.rarity-epic {
    border-color: #6a0dad;
    background-color: rgba(106, 13, 173, 0.2);

    i {
      color: #6a0dad;
    }
  }

  &.rarity-legendary {
    border-color: #d4af37;
    background-color: rgba(212, 175, 55, 0.2);

    i {
      color: #d4af37;
    }
  }

  &.rarity-unique {
    border-color: #b222dc;
    background-color: rgba(178, 34, 220, 0.2);

    i {
      color: #b222dc;
    }
  }

  &.rarity-mythic {
    border-color: #ffd700;
    background: linear-gradient(135deg, #ff0000, #ffd700);
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);

    i {
      color: #ffffff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
  }
}

.accessory-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.accessory-name {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
  line-height: 1.3;
  text-align: center;

  &.empty {
    color: rgba(192, 192, 192, 0.5);
    font-weight: 400;
  }
}

.accessory-rarity {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  transition: all 0.2s ease;
  align-self: flex-start;

  // 稀有度颜色（复用物品栏的样式）
  &.rarity-common {
    color: #8b7355;
    border: 1px solid #8b7355;
  }

  &.rarity-uncommon {
    color: #5b8a72;
    border: 1px solid #5b8a72;
  }

  &.rarity-rare {
    color: #3a5f8c;
    border: 1px solid #3a5f8c;
  }

  &.rarity-epic {
    color: #6a0dad;
    border: 1px solid #6a0dad;
  }

  &.rarity-legendary {
    color: #d4af37;
    border: 1px solid #d4af37;
  }

  &.rarity-unique {
    color: #b222dc;
    border: 1px solid #b222dc;
  }

  &.rarity-mythic {
    color: #ffffff;
    border: 1px solid #ffd700;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(255, 215, 0, 0.3));
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 4px rgba(255, 215, 0, 0.3);
  }
}

.accessories-description {
  min-height: 150px;
  max-height: 200px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.health-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.health-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow: hidden;
}

// 上方：两列布局
.health-top-section {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  min-height: 0;
  flex: 1;
}

.character-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 12px;
}

// 移动端折叠标题（桌面端隐藏）
.mobile-collapse-header {
  display: none;
}

.attributes-radar {
  padding-top: 12px;
  border-top: 1px solid rgba(192, 192, 192, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.radar-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #c0c0c0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s ease;
  width: 100%;
  justify-content: center;

  &:hover {
    color: #ffffff;

    i {
      color: #ffffff;
    }
  }

  i {
    font-size: 16px;
    color: #c0c0c0;
    transition: color 0.2s ease;

    &.toggle-icon {
      font-size: 12px;
      margin-left: auto;
    }
  }

  span {
    flex: 1;
    text-align: center;
  }
}

.radar-canvas {
  width: 100%;
  max-width: 200px;
  height: auto;
  aspect-ratio: 1;
}

.attributes-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  border: 1px solid rgba(192, 192, 192, 0.2);
}

.table-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #e0e0e0;

  i {
    font-size: 14px;
    color: #c0c0c0;
    width: 16px;
  }
}

.table-value {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  min-width: 40px;
  text-align: right;
}

.table-row.highlight {
  background-color: rgba(192, 192, 192, 0.15);
  border-color: rgba(192, 192, 192, 0.4);

  .table-label {
    color: #ffffff;
    font-weight: 600;

    i {
      color: #ffd700;
    }
  }

  .table-value {
    color: #ffd700;
    font-weight: 700;
  }
}

.soul-awakening {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
}

.soul-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;

  i {
    font-size: 16px;
    color: #c0c0c0;
  }
}

.circular-progress-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-progress {
  width: 100%;
  height: 100%;
}

.liquid-fill {
  transition:
    y 0.5s ease,
    height 0.5s ease;
}

.liquid-surface {
  transition: d 0.5s ease;
  opacity: 0.8;
}

.circular-progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.progress-value {
  font-size: 12px;
  font-weight: 600;
  color: #e0e0e0;
  line-height: 1.2;
  white-space: nowrap;
}

.info-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;

  &:first-child {
    gap: 10px; // 第一行（名称、等级、生命阶层）使用更小的间距
  }

  &:not(:last-child) {
    margin-bottom: 0;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;

  // 第一行的项目，如果标签文字较长，可以适当调整
  &:nth-child(3) {
    flex: 1.2; // 生命阶层稍微宽一点
  }

  &.small {
    .info-label {
      font-size: 12px;

      i {
        font-size: 14px;
      }
    }

    .info-value {
      font-size: 14px;
    }
  }
}

.info-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #c0c0c0;
  white-space: nowrap; // 防止标签文字换行

  i {
    font-size: 16px;
    color: #c0c0c0;
    flex-shrink: 0; // 图标不收缩
  }

  span {
    flex-shrink: 0; // 标签文字不收缩
  }
}

.info-value {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
}

.status-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.health-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.health-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;

  i {
    font-size: 16px;
    color: #c0c0c0;
  }
}

.health-bar-container {
  width: 100%;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(192, 192, 192, 0.3);
}

.health-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.2);

  &.hp {
    background: linear-gradient(90deg, #ff4444, #ff6666);
  }

  &.mp {
    background: linear-gradient(90deg, #4444ff, #6666ff);
  }

  &.sanity {
    background: linear-gradient(90deg, #fff9c4, #fff59d);
  }

  &.exp {
    background: linear-gradient(90deg, #e1bee7, #ce93d8);
  }
}

.health-value {
  font-size: 14px;
  text-align: right;
  color: #e0e0e0;
  font-weight: 500;
}

.health-description {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(192, 192, 192, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 10px;

  i {
    font-size: 18px;
    color: #c0c0c0;
    margin-top: 2px;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #e0e0e0;
    flex: 1;
  }
}

// ==================== 物品栏样式 ====================
.inventory-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1; // 填充父容器
  min-height: 0; // 关键：确保可以正确计算 flex 子元素的高度
  overflow: hidden; // 防止内容溢出
}

.character-selector-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(192, 192, 192, 0.5);
}

.weight-wallet-container {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.weight-display {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 200px;
  padding: 10px 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
}

.weight-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  flex-shrink: 0;

  i {
    font-size: 16px;
    color: #c0c0c0;
  }
}

.weight-bar-container {
  flex: 1;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(192, 192, 192, 0.3);
  min-width: 0;
}

.weight-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.2);
  background: linear-gradient(90deg, #4a90e2, #5ba3f5);

  &.weight-overload {
    background: linear-gradient(90deg, #ff4444, #ff6666);
    animation: pulse 1.5s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.weight-value {
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 80px;
  text-align: right;
}

.wallet-display {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0 0 auto;
  padding: 10px 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
  min-width: 180px;
}

.wallet-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #c0c0c0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(192, 192, 192, 0.2);

  i {
    font-size: 16px;
    color: #d4af37; // 金色图标
  }
}

.wallet-currencies {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.currency-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  i {
    font-size: 14px;
    flex-shrink: 0;
  }

  .currency-label {
    font-weight: 600;
    color: #c0c0c0;
    min-width: 40px;
    flex-shrink: 0;
  }

  .currency-value {
    font-weight: 700;
    flex: 1;
    text-align: right;
  }

  &.currency-gold {
    i {
      color: #d4af37; // 金色
    }

    .currency-value {
      color: #d4af37; // 金色
    }
  }

  &.currency-silver {
    i {
      color: #c0c0c0; // 银色
    }

    .currency-value {
      color: #c0c0c0; // 银色
    }
  }

  &.currency-copper {
    i {
      color: #cd7f32; // 铜色
    }

    .currency-value {
      color: #cd7f32; // 铜色
    }
  }
}

.selector-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
  flex-shrink: 0;

  i {
    font-size: 24px;
    color: #c0c0c0;
  }
}

.character-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 120px;
  padding-bottom: 4px;
  padding-right: 4px;

  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 3px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.character-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
  color: #c0c0c0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 14px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
    color: #e0e0e0;

    i {
      color: #e0e0e0;
    }
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.2);
    border-color: #c0c0c0;
    color: #ffffff;
    font-weight: 600;

    i {
      color: #ffffff;
    }
  }
}

.inventory-layout {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0; // 关键：确保可以正确计算 flex 子元素的高度
  overflow: hidden; // 防止内容溢出
  // 固定高度，与主要信息标签页的内容区域高度一致
  // 使用 flex: 1 和 min-height: 0 确保高度固定
}

.inventory-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0; // 关键：确保可以正确计算高度
  // 固定高度为5个物品的高度：每个物品约68px（12px padding * 2 + 40px 图标 + 内容），5个物品 + 4个间距(8px) = 5 * 68 + 4 * 8 = 340 + 32 = 372px
  height: calc(5 * 68px + 4 * 8px); // 固定高度，确保始终显示5个物品的高度
  overflow-y: auto;
  overflow-x: hidden;
  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.inventory-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px; // 减少右侧内边距，为滚动条留出空间
  // 不设置 flex: 1，让内容自然高度，超出部分由父容器滚动
}

.inventory-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #c0c0c0;
  text-align: center;
  flex: 1; // 填充父容器
  min-height: 0; // 确保可以正确计算高度

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.inventory-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(192, 192, 192, 0.5);
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.15);
    border-color: #c0c0c0;
    box-shadow: 0 2px 8px rgba(192, 192, 192, 0.2);
  }
}

.item-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(192, 192, 192, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(192, 192, 192, 0.2);
  flex-shrink: 0;
  transition: all 0.2s ease;

  i {
    font-size: 20px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  // 稀有度颜色
  &.rarity-common {
    border-color: #8b7355;
    background-color: rgba(139, 115, 85, 0.2);

    i {
      color: #8b7355;
    }
  }

  &.rarity-uncommon {
    border-color: #5b8a72;
    background-color: rgba(91, 138, 114, 0.2);

    i {
      color: #5b8a72;
    }
  }

  &.rarity-rare {
    border-color: #3a5f8c;
    background-color: rgba(58, 95, 140, 0.2);

    i {
      color: #3a5f8c;
    }
  }

  &.rarity-epic {
    border-color: #6a0dad;
    background-color: rgba(106, 13, 173, 0.2);

    i {
      color: #6a0dad;
    }
  }

  &.rarity-legendary {
    border-color: #d4af37;
    background-color: rgba(212, 175, 55, 0.2);

    i {
      color: #d4af37;
    }
  }

  &.rarity-unique {
    border-color: #b222dc;
    background-color: rgba(178, 34, 220, 0.2);

    i {
      color: #b222dc;
    }
  }

  &.rarity-mythic {
    border-color: #ffd700;
    background: linear-gradient(135deg, #ff0000, #ffd700);
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);

    i {
      color: #ffffff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
  }
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
  line-height: 1.3;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.item-rarity {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  transition: all 0.2s ease;

  // 稀有度颜色
  &.rarity-common {
    color: #8b7355;
    border: 1px solid #8b7355;
  }

  &.rarity-uncommon {
    color: #5b8a72;
    border: 1px solid #5b8a72;
  }

  &.rarity-rare {
    color: #3a5f8c;
    border: 1px solid #3a5f8c;
  }

  &.rarity-epic {
    color: #6a0dad;
    border: 1px solid #6a0dad;
  }

  &.rarity-legendary {
    color: #d4af37;
    border: 1px solid #d4af37;
  }

  &.rarity-unique {
    color: #b222dc;
    border: 1px solid #b222dc;
  }

  &.rarity-mythic {
    color: #ffffff;
    border: 1px solid #ffd700;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(255, 215, 0, 0.3));
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 4px rgba(255, 215, 0, 0.3);
  }
}

.item-count {
  font-size: 12px;
  color: #c0c0c0;
  font-weight: 500;
}

.inventory-description {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0; // 关键：确保可以正确计算高度
  max-height: 100%; // 限制最大高度
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(192, 192, 192, 0.3);
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 192, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(192, 192, 192, 0.7);
    }
  }
}

.description-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  min-height: 0;
  color: #c0c0c0;
  text-align: center;

  i {
    font-size: 48px;
    color: rgba(192, 192, 192, 0.5);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #c0c0c0;
  }
}

.description-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.description-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(192, 192, 192, 0.3);
}

.description-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(192, 192, 192, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(192, 192, 192, 0.2);
  flex-shrink: 0;
  transition: all 0.2s ease;

  i {
    font-size: 24px;
    color: #c0c0c0;
    transition: color 0.2s ease;
  }

  // 稀有度颜色（与 .item-icon 相同）
  &.rarity-common {
    border-color: #8b7355;
    background-color: rgba(139, 115, 85, 0.2);

    i {
      color: #8b7355;
    }
  }

  &.rarity-uncommon {
    border-color: #5b8a72;
    background-color: rgba(91, 138, 114, 0.2);

    i {
      color: #5b8a72;
    }
  }

  &.rarity-rare {
    border-color: #3a5f8c;
    background-color: rgba(58, 95, 140, 0.2);

    i {
      color: #3a5f8c;
    }
  }

  &.rarity-epic {
    border-color: #6a0dad;
    background-color: rgba(106, 13, 173, 0.2);

    i {
      color: #6a0dad;
    }
  }

  &.rarity-legendary {
    border-color: #d4af37;
    background-color: rgba(212, 175, 55, 0.2);

    i {
      color: #d4af37;
    }
  }

  &.rarity-unique {
    border-color: #b222dc;
    background-color: rgba(178, 34, 220, 0.2);

    i {
      color: #b222dc;
    }
  }

  &.rarity-mythic {
    border-color: #ffd700;
    background: linear-gradient(135deg, #ff0000, #ffd700);
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);

    i {
      color: #ffffff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
  }
}

.description-toggle {
  display: flex;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(192, 192, 192, 0.2);
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(192, 192, 192, 0.3);
  border-radius: 6px;
  color: #c0c0c0;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 12px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    border-color: rgba(192, 192, 192, 0.5);
    color: #e0e0e0;
  }

  &.active {
    background-color: rgba(192, 192, 192, 0.2);
    border-color: #c0c0c0;
    color: #ffffff;
  }
}

.description-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    word-break: break-word;
  }

  .description-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .description-rarity {
    font-size: 12px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.3);
    white-space: nowrap;
    transition: all 0.2s ease;

    // 稀有度颜色
    &.rarity-common {
      color: #8b7355;
      border: 1px solid #8b7355;
    }

    &.rarity-uncommon {
      color: #5b8a72;
      border: 1px solid #5b8a72;
    }

    &.rarity-rare {
      color: #3a5f8c;
      border: 1px solid #3a5f8c;
    }

    &.rarity-epic {
      color: #6a0dad;
      border: 1px solid #6a0dad;
    }

    &.rarity-legendary {
      color: #d4af37;
      border: 1px solid #d4af37;
    }

    &.rarity-unique {
      color: #b222dc;
      border: 1px solid #b222dc;
    }

    &.rarity-mythic {
      color: #ffffff;
      border: 1px solid #ffd700;
      background: linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(255, 215, 0, 0.3));
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 4px rgba(255, 215, 0, 0.3);
    }
  }

  .description-count,
  .description-weight,
  .description-value {
    font-size: 14px;
    color: #c0c0c0;
    font-weight: 500;
  }
}

.description-text {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #e0e0e0;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

// 装备详细信息样式
.equipment-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(192, 192, 192, 0.2);
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;

  .detail-label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #c0c0c0;
    font-weight: 600;
    min-width: 100px;
    flex-shrink: 0;

    i {
      font-size: 12px;
      color: #a0a0a0;
    }
  }

  .detail-value {
    color: #e0e0e0;
    flex: 1;
    word-break: break-word;

    &.special-effects {
      color: #ffd700;
      font-style: italic;
    }
  }
}

// 移动端响应式优化
@media (max-width: 768px) {
  .app-wrapper {
    flex-direction: column;
    gap: 6px;
    max-width: 100%;
    padding: 4px;
  }

  .tab-navigation {
    flex-direction: row;
    min-width: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 4px;
    padding: 4px 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(192, 192, 192, 0.5) rgba(0, 0, 0, 0.2);

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(192, 192, 192, 0.5);
      border-radius: 2px;

      &:hover {
        background: rgba(192, 192, 192, 0.7);
      }
    }
  }

  .tab-button {
    flex-direction: row;
    padding: 6px 8px;
    min-width: auto;
    flex-shrink: 0;
    font-size: 10px;
    gap: 3px;
    white-space: nowrap;

    i {
      font-size: 14px;
      flex-shrink: 0;
    }

    span {
      white-space: nowrap;
      flex-shrink: 0;
    }
  }

  .health-container {
    padding: 10px;
    border-width: 2px;
  }

  .character-selector-header {
    margin-bottom: 10px;
    padding-bottom: 8px;
    gap: 6px;
  }

  .tab-panel {
    gap: 8px;
  }

  .health-header {
    padding-bottom: 8px;
    margin-bottom: 8px;

    i {
      font-size: 18px;
    }

    h2 {
      font-size: 16px;
    }
  }

  .tab-content {
    gap: 12px;
  }

  .character-selector-header {
    flex-direction: column;
    gap: 6px;
    padding: 6px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom-width: 1px;
  }

  .selector-label {
    font-size: 14px;

    i {
      font-size: 16px;
    }
  }

  .character-buttons {
    flex-wrap: wrap;
    gap: 4px;
    max-height: 80px;
    overflow-y: auto;
    padding-right: 4px;
    -webkit-overflow-scrolling: touch;
  }

  .character-button {
    padding: 4px 8px;
    font-size: 11px;

    i {
      font-size: 12px;
    }
  }

  .health-content {
    gap: 8px;
  }

  .health-top-section {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  // 移动端折叠标题样式（仅在移动端显示）
  .mobile-collapse-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #c0c0c0;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(192, 192, 192, 0.3);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 8px;
    user-select: none;

    i {
      font-size: 14px;
      color: #c0c0c0;
      transition: color 0.2s ease;
    }

    .collapse-icon {
      margin-left: auto;
      font-size: 12px;
      transition: transform 0.2s ease;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      border-color: rgba(192, 192, 192, 0.4);
      color: #e0e0e0;

      i {
        color: #e0e0e0;
      }
    }
  }

  // 在移动端，默认显示内容（不折叠）
  .character-info-content,
  .status-bars-content {
    display: block;
  }

  .character-info {
    gap: 6px;
    width: 100%;
    flex: none;
  }

  .character-info-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .status-bars {
    width: 100%;
    flex: none;
    gap: 8px;
  }

  .status-bars-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .info-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .info-item {
    width: 100%;
    gap: 4px;

    &.small {
      width: 100%;
    }
  }

  // 在超小屏幕上改为两列
  @media (max-width: 480px) {
    .info-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .mobile-collapse-header {
      padding: 6px 8px;
      font-size: 12px;
      margin-bottom: 6px;

      i {
        font-size: 12px;
      }
    }
  }

  // 在极小屏幕上改为单列，并大幅增加宽度（约1.8倍）
  @media (max-width: 360px) {
    // 减少外层容器的padding，为内容留出更多空间
    .app-wrapper {
      padding: 1px;
      gap: 3px;
      max-width: 100%;
      width: 100%;
      box-sizing: border-box;
    }

    .health-container {
      padding: 4px;
      border-width: 1px;
      width: 100%;
      box-sizing: border-box;
    }

    .health-content {
      gap: 8px;
      padding: 0;
      width: 100%;
    }

    .health-top-section {
      gap: 10px;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .character-info {
      padding: 0;
      margin: 0;
      width: 100%;
      gap: 8px;
    }

    .character-info-content {
      gap: 14px;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    .info-row {
      grid-template-columns: 1fr;
      gap: 14px;
      padding: 0;
      margin: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .info-item {
      gap: 12px;
      padding: 16px 14px;
      background-color: rgba(0, 0, 0, 0.25);
      border: 2px solid rgba(192, 192, 192, 0.4);
      border-radius: 10px;
      width: 100%;
      box-sizing: border-box;
      min-width: 0;
      margin: 0;
    }

    .info-label {
      font-size: 17px;
      font-weight: 700;
      gap: 8px;

      i {
        font-size: 20px;
      }
    }

    .info-value {
      font-size: 20px;
      font-weight: 700;
    }

    .mobile-collapse-header {
      padding: 10px 12px;
      font-size: 15px;
      margin-bottom: 10px;

      i {
        font-size: 16px;
      }
    }
  }

  .info-label {
    font-size: 11px;

    i {
      font-size: 12px;
    }
  }

  .info-value {
    font-size: 13px;
  }

  .health-bar-container {
    gap: 6px;
  }

  .health-bar-label {
    font-size: 11px;

    i {
      font-size: 12px;
    }
  }

  .health-bar-fill {
    height: 20px;
  }

  .health-value {
    font-size: 11px;
  }

  .radar-canvas {
    max-width: 150px;
  }

  .attributes-table {
    gap: 6px;
  }

  .table-row {
    padding: 8px;
  }

  .table-label {
    font-size: 11px;

    i {
      font-size: 12px;
      width: 14px;
    }
  }

  .table-value {
    font-size: 14px;
    min-width: 35px;
  }

  .soul-awakening {
    gap: 6px;
  }

  .soul-label {
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .circular-progress-container {
    width: 80px;
    height: 80px;
  }

  .weight-wallet-container {
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .weight-display,
  .wallet-display {
    width: 100%;
    padding: 8px 10px;
    min-width: 0;
  }

  .weight-display {
    gap: 8px;
  }

  .wallet-display {
    gap: 6px;
  }

  .weight-label,
  .wallet-label {
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .weight-value {
    font-size: 12px;
  }

  .wallet-currencies {
    gap: 6px;
  }

  .currency-item {
    font-size: 11px;

    i {
      font-size: 12px;
    }

    .currency-label {
      font-size: 11px;
      min-width: 35px;
    }

    .currency-value {
      font-size: 12px;
    }
  }

  .inventory-layout {
    flex-direction: column;
    gap: 10px;
    flex: 1;
    min-height: 0;
  }

  .inventory-list {
    flex: 1;
    min-height: 0;
    max-height: none;
    height: auto;
  }

  .inventory-description {
    flex: 0 0 auto;
    max-height: 250px;
    min-height: 150px;
  }

  .inventory-item {
    padding: 8px;
    gap: 8px;
  }

  .inventory-icon {
    width: 32px;
    height: 32px;

    i {
      font-size: 16px;
    }
  }

  .inventory-name {
    font-size: 12px;
  }

  .inventory-count {
    font-size: 11px;
  }

  .equipment-tabs {
    flex-wrap: wrap;
    gap: 6px;
  }

  .equipment-tab {
    padding: 6px 10px;
    font-size: 11px;

    i {
      font-size: 14px;
    }
  }

  // 装备内容区域：改为纵向布局
  .equipment-content {
    flex-direction: column;
    gap: 12px;
  }

  // 左侧和右侧装备区域：全宽显示
  .equipment-left,
  .equipment-right {
    width: 100%;
    flex: none;
  }

  // 装备类型选择器
  .equipment-type-selector {
    gap: 8px;
    padding: 8px;
  }

  .type-button {
    padding: 6px 10px;
    font-size: 11px;

    i {
      font-size: 14px;
    }
  }

  // 装备列表区域
  .equipment-list {
    max-height: 300px;
    gap: 10px;
  }

  .weapon-slots,
  .armor-slots {
    gap: 10px;
  }

  .weapon-section,
  .armor-section {
    gap: 6px;
  }

  .section-title {
    padding: 8px;
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .weapon-slot,
  .armor-slot {
    padding: 8px;
    gap: 8px;
  }

  .equipment-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;

    i {
      font-size: 16px;
    }
  }

  .equipment-name {
    font-size: 11px;
  }

  // 装备详情区域
  .equipment-description {
    padding: 10px;
    max-height: 200px;
    min-height: 150px;
  }

  // 饰品区域
  .accessories-header {
    padding: 8px;
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .accessories-list {
    gap: 8px;
  }

  .accessory-slot {
    padding: 8px;
    gap: 8px;
  }

  .accessories-description {
    padding: 10px;
    max-height: 200px;
    min-height: 150px;
  }

  // 可装备点数显示
  .equipment-panel {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .equipment-points-display {
    padding: 8px 12px;
    margin-bottom: 12px;
  }

  .points-label {
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .points-values {
    font-size: 14px;
  }

  .points-current {
    font-size: 16px;
  }

  .points-limit {
    font-size: 14px;
  }

  .skills-tabs {
    flex-wrap: wrap;
    gap: 6px;
  }

  // 技能类型切换按钮：在移动端固定在顶部
  .skill-type-tabs {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #808080; // 与面板背景色一致
    padding: 8px 12px;
    margin: 0;
    border-bottom: 2px solid rgba(192, 192, 192, 0.3);
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 添加阴影以增强可见性
  }

  .skill-type-tab {
    padding: 6px 10px;
    font-size: 11px;
    flex: 1;
    min-width: 0;

    i {
      font-size: 14px;
    }
  }

  .skills-layout {
    flex-direction: column;
    gap: 12px;
  }

  .skills-list {
    max-height: 250px;
  }

  .skill-item {
    padding: 8px;
    gap: 8px;
  }

  .skill-name {
    font-size: 12px;
  }

  .skill-type-badge {
    font-size: 10px;
    padding: 2px 4px;
  }

  .skill-details {
    padding: 12px;
  }

  .skill-detail-header {
    gap: 8px;
    padding-bottom: 12px;
  }

  .skill-detail-icon {
    width: 48px;
    height: 48px;

    i {
      font-size: 24px;
    }
  }

  .skill-detail-title {
    h3 {
      font-size: 16px;
    }
  }

  .skill-detail-meta {
    font-size: 11px;
  }

  .skill-detail-badge {
    font-size: 10px;
    padding: 3px 6px;
  }

  .description-cost {
    font-size: 12px;
  }

  .description-text {
    p {
      font-size: 12px;
    }
  }

  // 任务类型切换按钮：在移动端固定在顶部
  .quest-type-tabs {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #808080; // 与面板背景色一致
    padding: 8px 12px;
    margin: 0;
    border-bottom: 2px solid rgba(192, 192, 192, 0.3);
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 添加阴影以增强可见性
  }

  .quest-type-tab {
    padding: 6px 10px;
    font-size: 11px;
    flex: 1;
    min-width: 0;

    i {
      font-size: 14px;
    }
  }

  .quest-layout {
    flex-direction: column;
    gap: 12px;
  }

  .quest-list {
    max-height: 250px;
  }

  .quest-item {
    padding: 8px;
    gap: 6px;
  }

  .quest-name {
    font-size: 13px;
  }

  .quest-meta {
    font-size: 11px;
  }

  .quest-status {
    font-size: 10px;
    padding: 2px 6px;
  }

  .quest-details {
    padding: 12px;
  }

  .quest-detail-header {
    padding-bottom: 12px;

    h3 {
      font-size: 16px;
    }
  }

  .quest-detail-meta {
    font-size: 11px;
  }

  .quest-detail-badge {
    font-size: 10px;
    padding: 3px 6px;
  }

  .quest-detail-content {
    h4 {
      font-size: 14px;
      padding-bottom: 6px;
    }

    p {
      font-size: 12px;
    }

    ul {
      font-size: 12px;
      padding-left: 16px;
      line-height: 1.6;
    }
  }

  .points-display {
    padding: 10px 12px;
    margin-bottom: 12px;
  }

  .points-label {
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .points-value {
    font-size: 16px;
  }

  .points-current {
    font-size: 18px;
  }

  .detail-row {
    font-size: 11px;
    flex-direction: column;
    gap: 4px;

    .detail-label {
      min-width: auto;
      font-size: 11px;

      i {
        font-size: 11px;
      }
    }

    .detail-value {
      font-size: 11px;
    }
  }

  // 确保所有滚动容器在移动端可用
  .skills-list,
  .skill-details,
  .quest-list,
  .quest-details,
  .inventory-list,
  .equipment-list,
  .equipment-description {
    -webkit-overflow-scrolling: touch;
  }
}

// 超小屏幕优化（小于480px）
@media (max-width: 480px) {
  .app-wrapper {
    padding: 4px;
    gap: 4px;
  }

  .health-container {
    padding: 8px;
    border-width: 1px;
  }

  .tab-button {
    padding: 5px 6px;
    font-size: 9px;
    gap: 2px;

    i {
      font-size: 12px;
    }
  }

  .health-header {
    h2 {
      font-size: 14px;
    }
  }

  .character-buttons {
    max-height: 100px;
  }

  .character-button {
    padding: 4px 8px;
    font-size: 11px;
  }

  .info-value {
    font-size: 13px;
  }

  .health-bar-fill {
    height: 18px;
  }

  .health-value {
    font-size: 10px;
  }

  .radar-canvas {
    max-width: 120px;
  }

  .circular-progress-container {
    width: 60px;
    height: 60px;
  }

  .weight-display,
  .wallet-display {
    padding: 6px 8px;
  }

  .weight-wallet-container {
    margin-bottom: 8px;
    gap: 4px;
  }

  .inventory-layout {
    gap: 8px;
  }

  .inventory-description {
    max-height: 200px;
    min-height: 120px;
    padding: 10px;
  }

  .currency-item {
    font-size: 10px;

    .currency-label {
      min-width: 30px;
      font-size: 10px;
    }

    .currency-value {
      font-size: 11px;
    }
  }

  .inventory-list,
  .equipment-list,
  .skills-list,
  .quest-list {
    max-height: 200px;
  }

  .equipment-content {
    gap: 8px;
  }

  .equipment-list {
    max-height: 250px;
  }

  .weapon-slot,
  .armor-slot,
  .accessory-slot {
    padding: 6px;
    gap: 6px;
  }

  .equipment-icon {
    width: 28px;
    height: 28px;

    i {
      font-size: 14px;
    }
  }

  .equipment-name {
    font-size: 10px;
  }

  .equipment-description,
  .accessories-description {
    padding: 8px;
    max-height: 150px;
    min-height: 120px;
  }

  .equipment-points-display {
    padding: 6px 10px;
    margin-bottom: 8px;
  }

  .points-label {
    font-size: 11px;

    i {
      font-size: 12px;
    }
  }

  .points-values {
    font-size: 12px;
  }

  .points-current {
    font-size: 14px;
  }

  .points-limit {
    font-size: 12px;
  }

  .skill-detail-icon {
    width: 32px;
    height: 32px;

    i {
      font-size: 16px;
    }
  }

  .skill-detail-title h3,
  .quest-detail-header h3 {
    font-size: 14px;
  }
}
</style>
