/* global React, window */

const { useMemo, useState } = React;
const { DragDropContext, Droppable, Draggable } = window.ReactBeautifulDnd;

const DEFAULT_BALANCE_AMOUNT = '$12,458.50';

const BACKGROUND_PRESETS = [
  { label: 'Midnight Gradient', value: 'gradient-midnight', preview: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
  { label: 'Sunrise Gradient', value: 'gradient-sunrise', preview: 'linear-gradient(135deg, #4338ca 0%, #f97316 100%)' },
  { label: 'Ocean Gradient', value: 'gradient-ocean', preview: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)' },
  { label: 'Solid Color', value: 'solid', preview: '#0f172a' },
];

const DEFAULT_BRANDING = {
  walletTitle: 'My Custom Wallet',
  logoUrl: '',
  primaryColor: '#3b82f6',
  primaryTextColor: '#ffffff',
  headerPreset: 'gradient-midnight',
  headerCustomColor: '#0f172a',
  headerTextColor: '#ffffff',
  balancePreset: 'gradient-midnight',
  balanceCustomColor: '#1e293b',
  balanceTextColor: '#ffffff',
  canvasBackground: '#f8fafc',
};

const CARD_BRANDS = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'American Express' },
  { id: 'discover', label: 'Discover' },
  { id: 'unionpay', label: 'UnionPay' },
  { id: 'diners', label: 'Diners Club' },
  { id: 'jcb', label: 'JCB' },
];

const DIGITAL_WALLETS = [
  { id: 'applePay', label: 'Apple Pay' },
  { id: 'googlePay', label: 'Google Pay' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'alipay', label: 'Alipay' },
];

const BANK_PAYOUT_OPTIONS = [
  { id: 'ach', label: 'ACH' },
  { id: 'sepa', label: 'SEPA' },
  { id: 'swift', label: 'SWIFT' },
  { id: 'fasterPayments', label: 'Faster Payments' },
];

const PALETTE_COMPONENTS = [
  { id: 'balance', type: 'BalanceDisplay', label: 'Wallet Balance' },
  { id: 'payButton', type: 'ActionButton', label: 'Payment CTA' },
  { id: 'secondaryButton', type: 'SecondaryButton', label: 'Secondary CTA' },
  { id: 'paymentMethods', type: 'PaymentMethods', label: 'Card Networks' },
  { id: 'digitalWallets', type: 'DigitalWallets', label: 'Digital Wallets' },
  { id: 'payoutOptions', type: 'PayoutChannels', label: 'Payout Channels' },
];

const ACTION_OPTIONS = [
  { value: 'pay', label: 'Pay Now', handler: () => alert('Processing payment flow...') },
  { value: 'getPaid', label: 'Get Paid', handler: () => alert('Initiating payout flow...') },
  { value: 'custom', label: 'Custom', handler: () => alert('Custom flow triggered.') },
];

let flowCounter = 0;
const createFlow = (name, brandingOverrides = {}, componentTypes = []) => {
  flowCounter += 1;
  const components = componentTypes
    .map((entry) => {
      const descriptor = typeof entry === 'string' ? { type: entry } : entry;
      const paletteItem = PALETTE_COMPONENTS.find((item) => item.type === descriptor.type);
      if (!paletteItem) return null;
      return {
        ...paletteItem,
        instanceId: `inst-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        config: { ...getPaletteDefaults(paletteItem.type), ...(descriptor.config || {}) },
      };
    })
    .filter(Boolean);
  return {
    id: `flow-${flowCounter}`,
    name,
    branding: { ...DEFAULT_BRANDING, walletTitle: `${name} Experience`, ...brandingOverrides },
    components,
  };
};

const INITIAL_FLOWS = [
  createFlow('Checkout', {
    walletTitle: 'Checkout Experience',
    primaryColor: '#3b82f6',
    headerPreset: 'gradient-midnight',
  }, [
    { type: 'BalanceDisplay', config: { headline: 'Wallet balance', subheadline: 'Ready to pay', amount: '$524.10' } },
    { type: 'PaymentMethods' },
    { type: 'ActionButton', config: { label: 'Complete Purchase', action: 'pay' } },
    { type: 'DigitalWallets', config: { variant: 'buttons', enabledWallets: ['applePay', 'googlePay'] } },
  ]),
  createFlow('Payout', {
    walletTitle: 'Payout Flow',
    primaryColor: '#0ea5e9',
    headerPreset: 'gradient-ocean',
    balancePreset: 'gradient-ocean',
  }, [
    { type: 'BalanceDisplay', config: { headline: 'Available for payout', subheadline: 'Settled funds', amount: '$8,742.00' } },
    { type: 'PayoutChannels', config: { note: 'Fast settlement across your regions' } },
    { type: 'SecondaryButton', config: { label: 'View payout history', action: 'custom' } },
  ]),
];

const resolveBackground = (preset, fallbackColor) => {
  const found = BACKGROUND_PRESETS.find((item) => item.value === preset);
  if (!found) return fallbackColor;
  if (found.value === 'solid') return fallbackColor;
  return found.preview;
};

const getPaletteDefaults = (type) => {
  switch (type) {
    case 'BalanceDisplay':
      return {
        headline: 'Available Balance',
        subheadline: 'Funds ready to use',
        amount: DEFAULT_BALANCE_AMOUNT,
        showAmount: true,
      };
    case 'ActionButton':
      return {
        label: 'Pay Now',
        action: 'pay',
      };
    case 'SecondaryButton':
      return {
        label: 'Add New Payment Method',
        action: 'custom',
      };
    case 'PaymentMethods':
      return {
        title: 'We accept',
        subtitle: 'Credit & debit cards',
        enabledBrands: ['visa', 'mastercard', 'amex'],
        variant: 'badges',
      };
    case 'DigitalWallets':
      return {
        title: 'Pay with digital wallets',
        enabledWallets: ['applePay', 'googlePay'],
        variant: 'buttons',
      };
    case 'PayoutChannels':
      return {
        title: 'Payouts supported',
        enabledChannels: ['ach', 'sepa'],
        note: 'Fast settlement within 1-2 business days',
      };
    default:
      return {};
  }
};

const FlowLogo = ({ branding }) => {
  if (!branding.logoUrl) return null;
  return (
    <div className="wallet-logo">
      <img src={branding.logoUrl} alt="Brand logo" />
    </div>
  );
};

const BalanceDisplay = ({ branding, config }) => {
  const background =
    config.customBackground ??
    (branding.balancePreset === 'solid'
      ? branding.balanceCustomColor
      : resolveBackground(branding.balancePreset, branding.balanceCustomColor));

  const textColor = config.textColor ?? branding.balanceTextColor;
  return (
    <div
      className="balance-display"
      style={{
        background,
        color: textColor,
      }}
    >
      <p className="balance-label">{config.headline}</p>
      {config.showAmount && <h1 className="balance-amount">{config.amount}</h1>}
      <p className="balance-subheadline">{config.subheadline}</p>
    </div>
  );
};

const PrimaryButton = ({ branding, config, onClick }) => (
  <button
    type="button"
    className="action-button action-button--primary"
    style={{
      backgroundColor: config.bgColor ?? branding.primaryColor,
      color: config.textColor ?? branding.primaryTextColor,
    }}
    onClick={onClick}
  >
    {config.label}
  </button>
);

const SecondaryButton = ({ branding, config, onClick }) => (
  <button
    type="button"
    className="action-button action-button--secondary"
    style={{
      borderColor: config.borderColor ?? branding.primaryColor,
      color: config.textColor ?? branding.primaryColor,
    }}
    onClick={onClick}
  >
    {config.label}
  </button>
);

const PaymentBadge = ({ children }) => <span className="payment-badge">{children}</span>;

const PaymentSection = ({ title, subtitle, children }) => (
  <div className="payment-section">
    {title && <h4 className="payment-section__title">{title}</h4>}
    {subtitle && <p className="payment-section__subtitle">{subtitle}</p>}
    <div className="payment-section__content">{children}</div>
  </div>
);

const PaymentMethods = ({ config }) => {
  const enabledBrands = CARD_BRANDS.filter((brand) => config.enabledBrands?.includes(brand.id));
  if (enabledBrands.length === 0) {
    return (
      <PaymentSection title={config.title} subtitle={config.subtitle}>
        <p className="empty-state">Select at least one card network.</p>
      </PaymentSection>
    );
  }

  return (
    <PaymentSection title={config.title} subtitle={config.subtitle}>
      <div className={`payment-badges payment-badges--${config.variant || 'badges'}`}>
        {enabledBrands.map((brand) => (
          <PaymentBadge key={brand.id}>{brand.label}</PaymentBadge>
        ))}
      </div>
    </PaymentSection>
  );
};

const DigitalWallets = ({ config, branding }) => {
  const enabledWallets = DIGITAL_WALLETS.filter((wallet) => config.enabledWallets?.includes(wallet.id));
  if (enabledWallets.length === 0) {
    return (
      <PaymentSection title={config.title}>
        <p className="empty-state">Enable at least one digital wallet.</p>
      </PaymentSection>
    );
  }

  if (config.variant === 'buttons') {
    return (
      <PaymentSection title={config.title}>
        <div className="wallet-buttons">
          {enabledWallets.map((wallet) => (
            <button
              key={wallet.id}
              type="button"
              className="wallet-button"
              style={{
                backgroundColor: branding.primaryColor,
                color: branding.primaryTextColor,
              }}
              onClick={() => alert(`${wallet.label} flow preview`)}
            >
              {wallet.label}
            </button>
          ))}
        </div>
      </PaymentSection>
    );
  }

  return (
    <PaymentSection title={config.title}>
      <div className="payment-badges payment-badges--badges">
        {enabledWallets.map((wallet) => (
          <PaymentBadge key={wallet.id}>{wallet.label}</PaymentBadge>
        ))}
      </div>
    </PaymentSection>
  );
};

const PayoutChannels = ({ config }) => {
  const enabledChannels = BANK_PAYOUT_OPTIONS.filter((channel) => config.enabledChannels?.includes(channel.id));
  if (enabledChannels.length === 0) {
    return (
      <PaymentSection title={config.title} subtitle={config.note}>
        <p className="empty-state">Enable at least one payout option.</p>
      </PaymentSection>
    );
  }

  return (
    <PaymentSection title={config.title} subtitle={config.note}>
      <ul className="payout-list">
        {enabledChannels.map((channel) => (
          <li key={channel.id}>{channel.label}</li>
        ))}
      </ul>
    </PaymentSection>
  );
};

function WalletBuilder() {
  const [flows, setFlows] = useState(INITIAL_FLOWS);
  const [activeFlowId, setActiveFlowId] = useState(INITIAL_FLOWS[0].id);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const activeFlow = useMemo(
    () => flows.find((flow) => flow.id === activeFlowId) ?? flows[0],
    [flows, activeFlowId],
  );

  const activeComponents = activeFlow?.components ?? [];

  const updateFlow = (flowId, updater) => {
    setFlows((prev) =>
      prev.map((flow) => {
        if (flow.id !== flowId) return flow;
        return updater(flow);
      }),
    );
  };

  const handleBrandingChange = (name, value) => {
    if (!activeFlow) return;
    updateFlow(activeFlow.id, (flow) => ({
      ...flow,
      branding: {
        ...flow.branding,
        [name]: value,
      },
    }));
  };

  const handleAddFlow = () => {
    const nextName = `Flow ${flows.length + 1}`;
    const newFlow = createFlow(nextName, {
      walletTitle: `${nextName} Experience`,
    });
    setFlows((prev) => [...prev, newFlow]);
    setActiveFlowId(newFlow.id);
    setSelectedComponent(null);
  };

  const handleFlowRename = (name) => {
    if (!activeFlow) return;
    updateFlow(activeFlow.id, (flow) => ({
      ...flow,
      name,
    }));
  };

  const handleComponentSelection = (flowId, instanceId) => {
    setSelectedComponent({ flowId, instanceId });
  };

  const deserialiseSelected = () => {
    if (!selectedComponent) return null;
    const flow = flows.find((f) => f.id === selectedComponent.flowId);
    if (!flow) return null;
    const component = flow.components.find((item) => item.instanceId === selectedComponent.instanceId);
    if (!component) return null;
    return { flow, component };
  };

  const updateSelectedComponentConfig = (updater) => {
    const selected = deserialiseSelected();
    if (!selected) return;
    updateFlow(selected.flow.id, (flow) => ({
      ...flow,
      components: flow.components.map((item) => {
        if (item.instanceId !== selected.component.instanceId) return item;
        const nextConfig = updater(item.config ?? {});
        return { ...item, config: nextConfig };
      }),
    }));
  };

  const handleComponentConfigChange = (field, value) => {
    updateSelectedComponentConfig((config) => ({ ...config, [field]: value }));
  };

  const handleMultiSelectToggle = (field, option) => {
    updateSelectedComponentConfig((config) => {
      const current = Array.isArray(config[field]) ? config[field] : [];
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...config, [field]: next };
    });
  };

  const removeComponent = () => {
    const selected = deserialiseSelected();
    if (!selected) return;
    updateFlow(selected.flow.id, (flow) => ({
      ...flow,
      components: flow.components.filter((item) => item.instanceId !== selected.component.instanceId),
    }));
    setSelectedComponent(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || !activeFlow) return;

    updateFlow(activeFlow.id, (flow) => {
      const components = Array.from(flow.components);

      if (source.droppableId === 'palette' && destination.droppableId === 'canvas') {
        const paletteItem = PALETTE_COMPONENTS[source.index];
        const newComponent = {
          ...paletteItem,
          instanceId: `inst-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          config: getPaletteDefaults(paletteItem.type),
        };
        components.splice(destination.index, 0, newComponent);
      } else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
        const [moved] = components.splice(source.index, 1);
        components.splice(destination.index, 0, moved);
      }

      return {
        ...flow,
        components,
      };
    });
  };

  const resolvedHeaderBackground =
    activeFlow?.branding.headerPreset === 'solid'
      ? activeFlow?.branding.headerCustomColor
      : resolveBackground(activeFlow?.branding.headerPreset, activeFlow?.branding.headerCustomColor);

  const resolvedBalanceBackground =
    activeFlow?.branding.balancePreset === 'solid'
      ? activeFlow?.branding.balanceCustomColor
      : resolveBackground(activeFlow?.branding.balancePreset, activeFlow?.branding.balanceCustomColor);

  const renderComponent = (component) => {
    switch (component.type) {
      case 'BalanceDisplay':
        return (
          <BalanceDisplay
            branding={{ ...activeFlow.branding, balancePreset: activeFlow.branding.balancePreset }}
            config={{ ...component.config, customBackground: resolvedBalanceBackground }}
          />
        );
      case 'ActionButton': {
        const actionMeta = ACTION_OPTIONS.find((item) => item.value === component.config.action) ?? ACTION_OPTIONS[0];
        return (
          <PrimaryButton
            branding={activeFlow.branding}
            config={component.config}
            onClick={actionMeta.handler}
          />
        );
      }
      case 'SecondaryButton': {
        const actionMeta = ACTION_OPTIONS.find((item) => item.value === component.config.action) ?? ACTION_OPTIONS[2];
        return (
          <SecondaryButton
            branding={activeFlow.branding}
            config={component.config}
            onClick={actionMeta.handler}
          />
        );
      }
      case 'PaymentMethods':
        return <PaymentMethods config={component.config} />;
      case 'DigitalWallets':
        return <DigitalWallets config={component.config} branding={activeFlow.branding} />;
      case 'PayoutChannels':
        return <PayoutChannels config={component.config} />;
      default:
        return null;
    }
  };

  const selectedDetails = deserialiseSelected();
  const selectedConfig = selectedDetails?.component?.config ?? null;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__copy">
          <h1>Wallet Builder</h1>
          <p>Create branded checkout, payout, and wallet experiences across every customer journey.</p>
        </div>
        <div className="app-header__meta">
          <span className="meta-chip">{flows.length} flows</span>
          <span className="meta-chip">{activeComponents.length} components</span>
        </div>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="builder-container"
          style={{ backgroundColor: activeFlow?.branding.canvasBackground ?? '#f8fafc' }}
        >
          <div className="sidebar">
          <h3>Component Library</h3>
          <Droppable droppableId="palette" isDropDisabled>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {PALETTE_COMPONENTS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(dragProvided) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        className="component-item"
                      >
                        {item.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

          <div className="main-canvas">
          <div className="wallet-preview-container">
            <div
              className="wallet-header"
              style={{
                background: resolvedHeaderBackground,
                color: activeFlow?.branding.headerTextColor,
              }}
            >
              <FlowLogo branding={activeFlow?.branding ?? DEFAULT_BRANDING} />
              <div className="wallet-header-copy">
                <span className="wallet-flow-name">{activeFlow?.name}</span>
                <h3>{activeFlow?.branding.walletTitle}</h3>
              </div>
            </div>

            <Droppable droppableId="canvas">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="canvas-dropzone">
                  {activeComponents.length > 0 ? (
                    activeComponents.map((item, index) => {
                      const isSelected =
                        selectedComponent?.instanceId === item.instanceId &&
                        selectedComponent?.flowId === activeFlow?.id;
                      return (
                        <Draggable key={item.instanceId} draggableId={item.instanceId} index={index}>
                          {(dragProvided) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className={`canvas-component ${isSelected ? 'canvas-component--selected' : ''}`}
                              onClick={() => handleComponentSelection(activeFlow.id, item.instanceId)}
                            >
                              {renderComponent(item)}
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <div className="placeholder-card">
                      <h4>Create your flow</h4>
                      <p>Drag components from the library to design this payment experience.</p>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>

          <div className="config-panel">
          <h3>Flow Settings</h3>
          <div className="flow-tabs">
            {flows.map((flow) => (
              <button
                key={flow.id}
                type="button"
                className={`flow-tab ${flow.id === activeFlowId ? 'flow-tab--active' : ''}`}
                onClick={() => {
                  setActiveFlowId(flow.id);
                  setSelectedComponent(null);
                }}
              >
                {flow.name}
              </button>
            ))}
            <button type="button" className="flow-tab flow-tab--add" onClick={handleAddFlow}>
              + Add Flow
            </button>
          </div>

          {activeFlow && (
            <>
              <div className="input-group">
                <label htmlFor="flowName">Flow name</label>
                <input
                  id="flowName"
                  type="text"
                  value={activeFlow.name}
                  onChange={(event) => handleFlowRename(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="walletTitle">Header title</label>
                <input
                  id="walletTitle"
                  type="text"
                  value={activeFlow.branding.walletTitle}
                  onChange={(event) => handleBrandingChange('walletTitle', event.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="logoUrl">
                  Logo URL <span className="input-caption">(https://…)</span>
                </label>
                <input
                  id="logoUrl"
                  type="text"
                  value={activeFlow.branding.logoUrl}
                  onChange={(event) => handleBrandingChange('logoUrl', event.target.value)}
                  placeholder="https://your-domain.com/logo.svg"
                />
              </div>

              <div className="panel-section">
                <h4>Brand colors</h4>
                <div className="input-group">
                  <label htmlFor="primaryColor">Primary button color</label>
                  <input
                    id="primaryColor"
                    type="color"
                    value={activeFlow.branding.primaryColor}
                    onChange={(event) => handleBrandingChange('primaryColor', event.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="primaryTextColor">Primary button text</label>
                  <input
                    id="primaryTextColor"
                    type="color"
                    value={activeFlow.branding.primaryTextColor}
                    onChange={(event) => handleBrandingChange('primaryTextColor', event.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Header background</label>
                  <select
                    value={activeFlow.branding.headerPreset}
                    onChange={(event) => handleBrandingChange('headerPreset', event.target.value)}
                  >
                    {BACKGROUND_PRESETS.map((preset) => (
                      <option key={preset.value} value={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                  {activeFlow.branding.headerPreset === 'solid' && (
                    <input
                      className="stacked-input"
                      type="color"
                      value={activeFlow.branding.headerCustomColor}
                      onChange={(event) => handleBrandingChange('headerCustomColor', event.target.value)}
                    />
                  )}
                </div>
                <div className="input-group">
                  <label htmlFor="headerTextColor">Header text color</label>
                  <input
                    id="headerTextColor"
                    type="color"
                    value={activeFlow.branding.headerTextColor}
                    onChange={(event) => handleBrandingChange('headerTextColor', event.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Balance background</label>
                  <select
                    value={activeFlow.branding.balancePreset}
                    onChange={(event) => handleBrandingChange('balancePreset', event.target.value)}
                  >
                    {BACKGROUND_PRESETS.map((preset) => (
                      <option key={preset.value} value={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                  {activeFlow.branding.balancePreset === 'solid' && (
                    <input
                      className="stacked-input"
                      type="color"
                      value={activeFlow.branding.balanceCustomColor}
                      onChange={(event) => handleBrandingChange('balanceCustomColor', event.target.value)}
                    />
                  )}
                </div>
                <div className="input-group">
                  <label htmlFor="balanceTextColor">Balance text color</label>
                  <input
                    id="balanceTextColor"
                    type="color"
                    value={activeFlow.branding.balanceTextColor}
                    onChange={(event) => handleBrandingChange('balanceTextColor', event.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="canvasBackground">Canvas background</label>
                  <input
                    id="canvasBackground"
                    type="color"
                    value={activeFlow.branding.canvasBackground}
                    onChange={(event) => handleBrandingChange('canvasBackground', event.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {selectedConfig && (
            <div className="panel-section">
              <h4>Component settings</h4>
              {selectedDetails.component.type === 'BalanceDisplay' && (
                <>
                  <div className="input-group">
                    <label htmlFor="balanceHeadline">Headline</label>
                    <input
                      id="balanceHeadline"
                      type="text"
                      value={selectedConfig.headline}
                      onChange={(event) => handleComponentConfigChange('headline', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="balanceSubheadline">Subheadline</label>
                    <input
                      id="balanceSubheadline"
                      type="text"
                      value={selectedConfig.subheadline}
                      onChange={(event) => handleComponentConfigChange('subheadline', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="balanceAmount">Displayed amount</label>
                    <input
                      id="balanceAmount"
                      type="text"
                      value={selectedConfig.amount}
                      onChange={(event) => handleComponentConfigChange('amount', event.target.value)}
                    />
                  </div>
                  <div className="input-group checkbox">
                    <label htmlFor="balanceShowAmount">
                      <input
                        id="balanceShowAmount"
                        type="checkbox"
                        checked={selectedConfig.showAmount}
                        onChange={(event) => handleComponentConfigChange('showAmount', event.target.checked)}
                      />
                      Show amount
                    </label>
                  </div>
                </>
              )}

              {(selectedDetails.component.type === 'ActionButton' ||
                selectedDetails.component.type === 'SecondaryButton') && (
                <>
                  <div className="input-group">
                    <label htmlFor="buttonLabel">Button label</label>
                    <input
                      id="buttonLabel"
                      type="text"
                      value={selectedConfig.label}
                      onChange={(event) => handleComponentConfigChange('label', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="buttonAction">Flow action</label>
                    <select
                      id="buttonAction"
                      value={selectedConfig.action}
                      onChange={(event) => handleComponentConfigChange('action', event.target.value)}
                    >
                      {ACTION_OPTIONS.map((action) => (
                        <option key={action.value} value={action.value}>
                          {action.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDetails.component.type === 'ActionButton' && (
                    <>
                      <div className="input-group">
                        <label htmlFor="buttonBg">Override background</label>
                        <input
                          id="buttonBg"
                          type="color"
                          value={selectedConfig.bgColor ?? activeFlow.branding.primaryColor}
                          onChange={(event) => handleComponentConfigChange('bgColor', event.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="buttonTextColor">Override text</label>
                        <input
                          id="buttonTextColor"
                          type="color"
                          value={selectedConfig.textColor ?? activeFlow.branding.primaryTextColor}
                          onChange={(event) => handleComponentConfigChange('textColor', event.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {selectedDetails.component.type === 'SecondaryButton' && (
                    <>
                      <div className="input-group">
                        <label htmlFor="buttonBorderColor">Border color</label>
                        <input
                          id="buttonBorderColor"
                          type="color"
                          value={selectedConfig.borderColor ?? activeFlow.branding.primaryColor}
                          onChange={(event) => handleComponentConfigChange('borderColor', event.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="secondaryTextColor">Text color</label>
                        <input
                          id="secondaryTextColor"
                          type="color"
                          value={selectedConfig.textColor ?? activeFlow.branding.primaryColor}
                          onChange={(event) => handleComponentConfigChange('textColor', event.target.value)}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {selectedDetails.component.type === 'PaymentMethods' && (
                <>
                  <div className="input-group">
                    <label htmlFor="paymentMethodsTitle">Section title</label>
                    <input
                      id="paymentMethodsTitle"
                      type="text"
                      value={selectedConfig.title}
                      onChange={(event) => handleComponentConfigChange('title', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="paymentMethodsSubtitle">Subtitle</label>
                    <input
                      id="paymentMethodsSubtitle"
                      type="text"
                      value={selectedConfig.subtitle ?? ''}
                      onChange={(event) => handleComponentConfigChange('subtitle', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="paymentMethodsVariant">Layout</label>
                    <select
                      id="paymentMethodsVariant"
                      value={selectedConfig.variant}
                      onChange={(event) => handleComponentConfigChange('variant', event.target.value)}
                    >
                      <option value="badges">Badges</option>
                      <option value="list">List</option>
                    </select>
                  </div>
                  <div className="input-group checkbox-group">
                    <span className="checkbox-group__label">Supported brands</span>
                    <div className="checkbox-grid">
                      {CARD_BRANDS.map((brand) => (
                        <label key={brand.id} className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={selectedConfig.enabledBrands?.includes(brand.id) ?? false}
                            onChange={() => handleMultiSelectToggle('enabledBrands', brand.id)}
                          />
                          {brand.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedDetails.component.type === 'DigitalWallets' && (
                <>
                  <div className="input-group">
                    <label htmlFor="walletsTitle">Section title</label>
                    <input
                      id="walletsTitle"
                      type="text"
                      value={selectedConfig.title}
                      onChange={(event) => handleComponentConfigChange('title', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="walletVariant">Layout</label>
                    <select
                      id="walletVariant"
                      value={selectedConfig.variant}
                      onChange={(event) => handleComponentConfigChange('variant', event.target.value)}
                    >
                      <option value="buttons">Buttons</option>
                      <option value="badges">Badges</option>
                    </select>
                  </div>
                  <div className="input-group checkbox-group">
                    <span className="checkbox-group__label">Digital wallets</span>
                    <div className="checkbox-grid">
                      {DIGITAL_WALLETS.map((wallet) => (
                        <label key={wallet.id} className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={selectedConfig.enabledWallets?.includes(wallet.id) ?? false}
                            onChange={() => handleMultiSelectToggle('enabledWallets', wallet.id)}
                          />
                          {wallet.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedDetails.component.type === 'PayoutChannels' && (
                <>
                  <div className="input-group">
                    <label htmlFor="payoutTitle">Section title</label>
                    <input
                      id="payoutTitle"
                      type="text"
                      value={selectedConfig.title}
                      onChange={(event) => handleComponentConfigChange('title', event.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="payoutNote">Note</label>
                    <input
                      id="payoutNote"
                      type="text"
                      value={selectedConfig.note ?? ''}
                      onChange={(event) => handleComponentConfigChange('note', event.target.value)}
                    />
                  </div>
                  <div className="input-group checkbox-group">
                    <span className="checkbox-group__label">Channels</span>
                    <div className="checkbox-grid">
                      {BANK_PAYOUT_OPTIONS.map((channel) => (
                        <label key={channel.id} className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={selectedConfig.enabledChannels?.includes(channel.id) ?? false}
                            onChange={() => handleMultiSelectToggle('enabledChannels', channel.id)}
                          />
                          {channel.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button type="button" className="remove-button" onClick={removeComponent}>
                Remove component
              </button>
            </div>
          )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

ReactDOM.render(<WalletBuilder />, document.getElementById('root'));
